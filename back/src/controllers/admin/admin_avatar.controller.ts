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

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Avatar not found' });
    }

    const oldPath = path.join(__dirname, '../../upload/avatar', rows[0].img);

    if (fs.existsSync(oldPath)) {
      // Delete the old file
    fs.unlinkSync(oldPath);
    } else {
      console.warn(`Old file not found at ${oldPath}`);
    }
    
    // Save the file to the upload directory
    fs.writeFileSync(uploadPath, buffer);


    await pool.query("UPDATE avatar SET img = $1 WHERE id = $2", [originalname, id]);
    res.status(200).json({ message: 'Avatar has been update' });
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
}];

export const remove = async (req: Request, res: Response) => {
  try {

    const id = parseInt(req.params.id);
    const { rows } = await pool.query("SELECT img from avatar WHERE id = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Avatar not found' });
    }

    const uploadPath = path.join(__dirname, '../../upload/avatar', rows[0].img);

    await pool.query("UPDATE user_account SET id_avatar = 1 WHERE id_avatar = $1", [id]);
    
    await pool.query("DELETE from avatar WHERE id = $1", [id]);

    if(fs.existsSync(uploadPath)){
      fs.unlinkSync(uploadPath);
    } else{
      console.warn(`File not found at ${uploadPath}`);
    }
    
    
    res.status(200).json({ message: 'Avatar has been delete' });
  } catch (error) {
    console.error('Error :' + error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
