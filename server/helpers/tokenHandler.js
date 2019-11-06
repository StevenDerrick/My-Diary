import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encrypter = (userId) => {
  const token = jwt.sign({
    userId,
  },
  process.env.JWT_KEY,
  {
    expiresIn: '30d',
  });
  return token;
};

export const decrypter = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  return decodedToken;
};
