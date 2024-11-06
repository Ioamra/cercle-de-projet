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
    const id = parseInt(req.params.id);
    const { email, pseudo, first_name, last_name, password, id_avatar } = req.body;

    const { rows } = await pool.query(`SELECT COUNT(email) AS mail_exist FROM user_account WHERE email = $1 AND id != $2;`, [email, id]);

    if (rows[0].mail_exist != 0) {
      return res.status(409).json({ message: 'Email already in use.' });
    } else {
      const { rows } = await pool.query(`SELECT COUNT(pseudo) AS pseudo_exist FROM user_account WHERE pseudo = $1 AND id != $2;`, [pseudo, id]);
      if (rows[0].pseudo_exist != 0) {
        return res.status(409).json({ message: 'Pseudo already in use.' });
      } else {
        await pool.query(
          `UPDATE user_account
           SET email = $1, pseudo = $2, first_name = $3, last_name = $4, password = $5, id_avatar = $6
           WHERE id = $7`,
          [email, pseudo, first_name, last_name, password, id_avatar, id],
        );
        res.status(201).json({ message: 'user_account has been update' });
      }
    }
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
