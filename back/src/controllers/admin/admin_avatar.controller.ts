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

export const update = [
  upload.single('file'),
  async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
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
    const { rows } = await pool.query("SELECT img FROM avatar WHERE id = $1", [id]);
    const oldPath = path.join(__dirname, '../../upload/avatar', rows[0].img);
    // Delete the old file
    fs.unlinkSync(oldPath);
    // Save the file to the upload directory
    fs.writeFileSync(uploadPath, buffer);


    await pool.query("UPDATE avatar SET img = $1 WHERE id = $2", [originalname, id]);
    res.status(201).json({ message: 'Avatar has been update' });
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
}];

export const remove = async (req: Request, res: Response) => {
  try {

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const id = parseInt(req.params.id);
    const { originalname, buffer, mimetype } = req.file;
    const uploadPath = path.join(__dirname, '../../upload/avatar', originalname);
    const { rows } = await pool.query("DELETE from avatar WHERE id = $1", [id]);

    fs.unlinkSync(uploadPath);
    

    res.status(201).json({ message: 'Avatar has been delete' });
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
