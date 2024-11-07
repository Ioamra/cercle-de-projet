import { Request, Response } from 'express';
import pool from '../config/db.config';
import { generateToken, getIdUserAccountInToken } from '../services/jwt.service';

type User = {
  id: number;
  email: string;
  pseudo: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: string;
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const query = `SELECT COUNT(*) as exist, user_account.id, role, email, pseudo, first_name, last_name, avatar.img AS avatar
    FROM user_account INNER JOIN avatar ON avatar.id = user_account.id_avatar WHERE email = $1 AND password = $2 GROUP BY user_account.id, avatar.img;`;
    const { rows } = await pool.query(query, [email, password]);
    if (rows[0].exist == 1) {
      const user: User = {
        id: rows[0].id,
        email: rows[0].email,
        pseudo: rows[0].pseudo,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        avatar: 'localhost:3000/api/img/' + rows[0].avatar,
        role: rows[0].role,
      };
      return res.status(200).json({
        token: generateToken({
          id: rows[0].id,
          role: rows[0].role,
        }),
        user,
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response) => {
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
        const { rows: avatarRows } = await pool.query(
          `SELECT img FROM user_account INNER JOIN avatar ON avatar.id = user_account.id_avatar WHERE user_account.id = $1;`,
          [rows[0].id],
        );
        return res.status(200).json({
          token: generateToken({
            id: rows[0].id,
            role: 'user',
          }),
          user: {
            id: rows[0].id,
            email,
            pseudo,
            first_name,
            last_name,
            avatar: 'localhost:3000/api/img/' + avatarRows[0].img,
            role: 'user',
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { rows } = await pool.query(
      `
      SELECT
        id,
        pseudo,
        last_name,
        first_name,
        email,
        avatar.img,
        AVG(quiz_result.note) AS note_best,
        MAX(quiz_result.note) AS note_max,
        MIN(quiz_result.note) AS note_min
      FROM user_account
      INNER JOIN avatar ON avatar.id = user_account.id_avatar
      LEFT JOIN quiz_result ON quiz_result.id_user_account = user_account.id
      WHERE id = $1;
    `,
      [id],
    );
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

export const findAllFriend = async (req: Request, res: Response) => {
  try {
    const id = getIdUserAccountInToken(req.headers.authorization!);

    const { rows } = await pool.query(
      `
      SELECT
        user_account.id,
        user_account.pseudo,
        user_account.last_name,
        user_account.first_name,
        user_account.email,
        avatar.img AS avatar,
        AVG(quiz_result.note) AS note_best,
        MAX(quiz_result.note) AS note_max,
        MIN(quiz_result.note) AS note_min
      FROM user_account
      INNER JOIN avatar ON user_account.id_avatar = avatar.id
      LEFT JOIN quiz_result ON user_account.id = quiz_result.id_user_account
      WHERE user_account.id IN (
        SELECT user_account_has_friend.id_friend
        FROM user_account_has_friend
        WHERE user_account_has_friend.id_user_account = $1
        UNION
        SELECT user_account_has_friend.id_user_account
        FROM user_account_has_friend
        WHERE user_account_has_friend.id_friend = $1
      )
      GROUP BY user_account.id, avatar.img;
      `,
      [id],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findLeaderboard = async (req: Request, res: Response) => {
  try {
    const order = req.params.order;
    if (order != 'avg_note' && order != 'nb_quiz_make' && order != 'total_note') {
      return res.status(500).json({ message: 'Order not accepted' });
    }
    const { rows } = await pool.query(
      `
      SELECT
        user_account.id,
        user_account.pseudo,
        user_account.email,
        user_account.first_name,
        user_account.last_name,
        AVG(quiz_result.note) AS avg_note,
        COUNT(quiz_result.note) AS nb_quiz_make,
        SUM(quiz_result.note) AS total_note
      FROM user_account
      INNER JOIN avatar ON avatar.id = user_account.id_avatar
      LEFT JOIN quiz_result ON user_account.id = quiz_result.id_user_account
      GROUP BY user_account.id
      ORDER BY $1 DESC;
      `,
      [order],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const findFriendLeaderboard = async (req: Request, res: Response) => {
  try {
    const id = getIdUserAccountInToken(req.headers.authorization!);
    const order = req.params.order;
    if (order != 'avg_note' && order != 'nb_quiz_make' && order != 'total_note') {
      return res.status(500).json({ message: 'Order not accepted' });
    }
    const { rows } = await pool.query(
      `
      SELECT
        user_account.id,
        user_account.pseudo,
        user_account.email,
        user_account.first_name,
        user_account.last_name,
        AVG(quiz_result.note) AS avg_note,
        COUNT(quiz_result.note) AS nb_quiz_make,
        SUM(quiz_result.note) AS total_note
      FROM user_account
      INNER JOIN avatar ON avatar.id = user_account.id_avatar
      LEFT JOIN quiz_result ON user_account.id = quiz_result.id_user_account
      WHERE user_account.id IN (
        SELECT user_account_has_friend.id_friend
        FROM user_account_has_friend
        WHERE user_account_has_friend.id_user_account = $1
        UNION
        SELECT user_account_has_friend.id_user_account
        FROM user_account_has_friend
        WHERE user_account_has_friend.id_friend = $1
      )
      GROUP BY user_account.id
      ORDER BY $2 DESC;
      `,
      [id, order],
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const friendRequest = async (req: Request, res: Response) => {
  try {
    const idInitiator = getIdUserAccountInToken(req.headers.authorization!);
    const id = parseInt(req.params.id);

    await pool.query(`INSERT INTO user_account_has_friend (id_user_account, id_friend, accepted) VALUES ($1, $2, $3)`, [idInitiator, id, false]);
    return res.status(201).json({ message: 'Friend request send' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const acceptFriend = async (req: Request, res: Response) => {
  try {
    const idInitiator = getIdUserAccountInToken(req.headers.authorization!);
    const { id } = req.body;

    await pool.query(`UPDATE user_account_has_friend SET accepted = true WHERE id_user_account = $1 AND id_friend = $2`, [id, idInitiator]);
    return res.status(201).json({ message: 'Friend request send' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
