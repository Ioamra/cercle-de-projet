import { Request, Response } from 'express';
import pool from '../config/db.config';

type LessonWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: string;
  difficulty: string;
};

type QuizWithoutDetail = {
  id: number;
  title: string;
  description: string;
  time_in_min: string;
  difficulty: string;
};

type Lesson = {
  id: number;
  title: string;
  content: string;
  img: string;
  video: string;
  time_in_min: string;
  difficulty: string;
  similary_lessons: LessonWithoutDetail[];
  similary_quizes: QuizWithoutDetail[];
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query<LessonWithoutDetail[]>('SELECT id, title, description, time_in_min, difficulty FROM LESSON');
    res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { rows } = await pool.query<Lesson[]>(
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

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
