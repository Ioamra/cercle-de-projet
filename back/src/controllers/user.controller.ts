import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db.config';

// Mock user data (temporary)
const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
  },
];

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    if (mockUsers.find((user) => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email,
      password, // Note: In production, hash the password
      name,
    };
    mockUsers.push(newUser);

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = mockUsers.find((u) => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
