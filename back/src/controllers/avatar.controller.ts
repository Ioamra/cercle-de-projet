import { Request, Response } from 'express';
import pool from '../config/db.config';
import { Avatar } from '../models/avatar.model';

export const findAll = async (req: Request, res: Response): Promise<Response<Avatar.IAvatar[]>> => {
  try {
    const { rows } = await pool.query(`SELECT id, 'localhost:3000/api/img/' || img as img FROM avatar`);

    return res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
