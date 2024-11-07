import { Request, Response } from 'express';
import pool from '../config/db.config';
import { getIdUserAccountInToken } from '../services/jwt.service';

type QuizWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: number;
  difficulty: string;
  avg_note: number;
  play_count: number;
};

type Quiz = {
  id: number;
  title: string;
  description: string;
  time_in_min: number;
  difficulty: string;
  avg_note: number;
  play_count: number;
  questions: QuizQuestion[];
};

type QuizQuestion = {
  id: number;
  content: string;
  responses: QuizResponse[];
};

type QuizResponse = {
  id: number;
  content: string;
  is_correct: boolean;
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query<QuizWithoutDetail>(`
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

    res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { rows } = await pool.query<Quiz>(
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
          'response', (SELECT ARRAY_AGG(JSON_BUILD_OBJECT(
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

    res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

type QuestionResult = {
  id_question: number;
  id_response: number;
  is_correct: boolean;
};

export const addQuizResult = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data: QuestionResult[] = req.body;
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
    res.status(201).json({ message: 'quiz as been added' });
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
