import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const haveToken = (req: any, res: any, next: any): void => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized access' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(403).json({ message: 'Token expired' });
        return;
      }
      res.status(403).json({ message: 'Unauthorized access' });
      return;
    }
    next();
  });
};

export default haveToken;
