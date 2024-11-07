import { Request, Response } from 'express';
import pool from '../config/db.config';
import { Quiz } from '../models/quiz.model';
import { getIdUserAccountInToken } from '../services/jwt.service';

export const findAll = async (req: Request, res: Response): Promise<Response<Quiz.IQuizWithoutDetail[]>> => {
  try {
    const { rows } = await pool.query(`
      SELECT
        quiz.id,
        quiz.title,
        quiz.description,
        quiz.time_in_min,
        quiz.difficulty,
        AVG(quiz_result.note) AS avg_note,
        COUNT(quiz_result.id) AS play_count
      FROM quiz
      LEFT JOIN quiz_result ON quiz_result.id_quiz = quiz.id
      GROUP BY quiz.id
    `);

    return res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findOne = async (req: Request, res: Response): Promise<Response<Quiz.IQuiz>> => {
  try {
    const id = parseInt(req.params.id);
    const { rows } = await pool.query(
      `
      SELECT
        quiz.id,
        quiz.title,
        quiz.description,
        quiz.time_in_min,
        quiz.difficulty,
        AVG(quiz_result.note) AS avg_note,
        COUNT(quiz_result.id) AS play_count,
        ARRAY_AGG(JSON_BUILD_OBJECT(
          'id', question.id,
          'content', question.content,
          'responses', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
            'id', response.id,
            'content', response.content,
            'is_correct', response.is_correct
          )) FROM response WHERE response.id_question = question.id)
        )) AS questions
      FROM quiz
      INNER JOIN question ON question.id_quiz = quiz.id
      LEFT JOIN quiz_result ON quiz_result.id_quiz = quiz.id
      WHERE quiz.id = $1
	    GROUP BY quiz.id
    `,
      [id],
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error :' + error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addQuizResult = async (req: Request, res: Response): Promise<Response<{ message: string }>> => {
  try {
    const id = parseInt(req.params.id);
    const data: Quiz.IQuestionResult[] = req.body;
    const idInitiator = getIdUserAccountInToken(req.headers.authorization!);

    const nbAnswer = data.length;
    const nbCorrectAnswer = data.filter((result) => result.is_correct).length;

    const { rows } = await pool.query('INSERT INTO quiz_result (note, id_quiz, id_user_account) VALUES ($1, $2, $3) RETURNING id', [
      Math.round((nbCorrectAnswer / nbAnswer) * 100) / 100,
      id,
      idInitiator,
    ]);
    const id_quiz_result = rows[0].id;

    for (let i = 0; i < data.length; i++) {
      await pool.query('INSERT INTO user_response (id_quiz_result, id_question, id_response) VALUES ($1, $2, $3)', [
        id_quiz_result,
        data[i].id_question,
        data[i].id_response,
      ]);
    }
    return res.status(201).json({ message: 'quiz as been added' });
  } catch (error) {
    console.error('Error :' + error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
