import { Request, Response } from 'express';
import pool from '../../config/db.config';

export const create = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT 'AAAAAAAAAAAAAAAAAAAA' AS prout");

    res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT 'AAAAAAAAAAAAAAAAAAAA' AS prout");

    res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT 'AAAAAAAAAAAAAAAAAAAA' AS prout");

    res.status(201).json(rows);
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
