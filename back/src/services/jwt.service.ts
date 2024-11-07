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

const getIdUserAccountInToken = (token: string): number | null => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return user.id;
  } catch (err) {
    return null;
  }
};

export { generateToken, getIdUserAccountInToken };
