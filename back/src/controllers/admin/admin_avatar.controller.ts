import { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import pool from '../../config/db.config';
const upload = multer();

export const create = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }
      const { originalname, buffer, mimetype } = req.file;
      const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      const uploadPath = path.join(__dirname, '../../upload/avatar', originalname);

      if (!allowedMimeTypes.includes(mimetype)) {
        res.status(400).json({ message: 'Invalid file type. Only PNG, JPG, and JPEG are allowed.' });
        return;
      }
      // Save the file to the upload directory
      fs.writeFileSync(uploadPath, buffer);

      const { rows } = await pool.query('INSERT INTO avatar (img) VALUES ($1) RETURNING *', ['avatar/' + originalname]);

      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error :' + error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
];

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
