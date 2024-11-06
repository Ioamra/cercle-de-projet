import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import pool from '../../config/db.config';

export const create = async (req: Request, res: Response) => {
  try {
    const { title, video, content, description } = req.body;
    let img_name = null;
    if (req.file) {
      const uploadDir = path.join(__dirname, '../../../uploads/lesson');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, req.file.filename);
      fs.writeFileSync(filePath, req.file.buffer);

      img_name = `/uploads/lesson/${req.file.filename}`;
    }
    await pool.query('INSERT INTO lesson (title, img, video, content, description) VALUES (?, ?, ?, ?, ?)', [
      title,
      img_name,
      video,
      content,
      description,
    ]);

    res.status(201).json({ response: 'Lesson correctly added' });
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
