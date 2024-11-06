import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

type UserJwtInfo = {
  id: number;
  role?: string;
};

const generateToken = (user: UserJwtInfo): string => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const getIdUtilisateurInToken = (token: string): Promise<number | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
      if (err) {
        reject(null);
      } else {
        resolve(user.id);
      }
    });
  });
};

export { generateToken, getIdUtilisateurInToken };
