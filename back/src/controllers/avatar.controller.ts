import { Request, Response } from 'express';
import pool from '../config/db.config';

type Avatar = {
  id: number;
  img: string;
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query<Avatar[]>(`SELECT id, 'localhost:3000/api/img/' || img as img FROM avatar`);

    res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
