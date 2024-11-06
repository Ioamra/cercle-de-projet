import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const haveAdminToken = (req: any, res: any, next: any): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Acces non autorisé' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(403).json({ message: 'Token expiré' });
        return;
      }
      res.status(403).json({ message: 'Acces non autorisé' });
      return;
    }
    if (user.role != 'admin') {
      res.status(403).json({ message: 'Acces non autorisé' });
      return;
    }
    next();
  });
};

export default haveAdminToken;
