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
    const token = encrypter(newUser.email, newUser.firstName);

    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
      },
    });
  });
};
