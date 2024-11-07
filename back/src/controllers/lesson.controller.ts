import { Request, Response } from 'express';
import pool from '../config/db.config';
import { Lesson } from '../models/lesson.model';

export const findAll = async (req: Request, res: Response): Promise<Response<Lesson.ILessonWithoutDetail[]>> => {
  try {
    const { rows } = await pool.query('SELECT id, title, description, time_in_min, difficulty FROM LESSON');
    return res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findOne = async (req: Request, res: Response): Promise<Response<Lesson.ILesson[]>> => {
  try {
    const id = parseInt(req.params.id);
    const { rows } = await pool.query(
      `
      SELECT
        lesson.id,
        lesson.title,
        lesson.content,
        lesson.img,
        lesson.video,
        lesson.time_in_min,
        lesson.difficulty,
        COALESCE(ARRAY_AGG(JSON_BUILD_OBJECT(
          'id', similary_lesson.id,
          'title', similary_lesson.title,
          'description', similary_lesson.description,
          'time_in_min', similary_lesson.time_in_min,
          'difficulty', similary_lesson.difficulty
        ) ORDER BY similary_lesson.id) FILTER (WHERE similary_lesson.id IS NOT NULL), '{}') as similary_lessons,
        COALESCE(ARRAY_AGG(JSON_BUILD_OBJECT(
          'id', quiz.id,
          'title', quiz.title,
          'description', quiz.description,
          'time_in_min', quiz.time_in_min,
          'difficulty', quiz.difficulty
        ) ORDER BY quiz.id) FILTER (WHERE quiz.id IS NOT NULL), '{}') as similary_quizes
      FROM lesson
      LEFT JOIN quiz_has_lesson ON quiz_has_lesson.id_lesson = lesson.id
      LEFT JOIN quiz ON quiz.id = quiz_has_lesson.id_quiz
      LEFT JOIN lesson_has_similary ON lesson_has_similary.id_lesson = lesson.id
      LEFT JOIN lesson AS similary_lesson ON similary_lesson.id = lesson_has_similary.id_lesson_similary
      WHERE lesson.id = $1
      GROUP BY lesson.id
    `,
      [id],
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error :' + error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
