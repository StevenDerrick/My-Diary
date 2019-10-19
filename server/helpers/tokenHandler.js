import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encrypter = (email, userId) => {
  const token = jwt.sign({
    email,
    userId,
  },
  process.env.JWT_KEY,
  {
    expiresIn: '30d',
  });
  return token;
};
