import { Request, Response } from 'express';
import pool from '../config/db.config';
import { generateToken } from '../services/jwt.service';

type User = {
  id: number;
  role: string;
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const query = `SELECT COUNT(*) as exist, id, role FROM user_account WHERE email = $1 AND password = $2 GROUP BY id;`;
    const { rows } = await pool.query(query, [email, password]);
    if (rows[0].exist == 1) {
      const user: User = {
        id: rows[0].id,
        role: rows[0].role,
      };
      return res.status(200).json({ token: generateToken(user) });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, pseudo, first_name, last_name, password, id_avatar } = req.body;

    const { rows } = await pool.query(`SELECT COUNT(email) AS mail_exist FROM user_account WHERE email = $1;`, [email]);

    if (rows[0].mail_exist != 0) {
      return res.status(409).json({ message: 'Email already in use.' });
    } else {
      const { rows } = await pool.query(`SELECT COUNT(pseudo) AS pseudo_exist FROM user_account WHERE pseudo = $1;`, [pseudo]);
      if (rows[0].pseudo_exist != 0) {
        return res.status(409).json({ message: 'Pseudo already in use.' });
      } else {
        const { rows } = await pool.query(
          `INSERT INTO user_account (email, pseudo, first_name, last_name, password, role, id_avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
          [email, pseudo, first_name, last_name, password, 'user', id_avatar],
        );

        const user: User = {
          id: rows[0].id,
          role: 'user',
        };
        return res.status(200).json({ token: generateToken(user) });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const findOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const query = `SELECT * FROM user_account WHERE id = $1;`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length) {
      return res.status(200).json(rows[0]);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { findOne, login, register };
