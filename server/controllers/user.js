import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { encrypter } from '../helpers/tokenHandler';
import users from '../models/Users';

dotenv.config();

const app = express();
app.use(express.json);

exports.usersSignUp = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const newUser = {
      userId: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    };
    users.push(newUser);
    const token = encrypter(newUser.email, newUser.userId);

    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
      },
    });
  });
};

exports.usersSignIn = (req, res) => {
  const user = users.find((c) => c.email === req.body.email);
  const token = encrypter(user.email, user.userId);
  res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token,
    },
  });
};
