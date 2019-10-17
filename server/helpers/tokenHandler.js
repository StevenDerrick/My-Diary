import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encrypter = (email, firstName) => {
  const token = jwt.sign({
    email,
    firstName,
  },
  process.env.JWT_KEY,
  {
    expiresIn: '3h',
  });
  return token;
};
