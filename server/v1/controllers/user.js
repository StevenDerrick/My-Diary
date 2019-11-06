import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { encrypter } from '../../helpers/tokenHandler';
import Responsender from '../../helpers/responseHandler';
import { STATUS_CODE_OK, STATUS_CODE_CREATED } from '../../helpers/statusCodeHandler';
import users from '../models/Users';

dotenv.config();

const app = express();
app.use(express.json);

exports.usersSignUp = (req, res) => {
  const response = new Responsender();
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    const newUser = {
      userId: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    };
    users.push(newUser);
    response.successful(STATUS_CODE_CREATED, 'User created successfully', {
      token: encrypter(newUser.userId),
    });
    return response.send(res);
  });
};

exports.usersSignIn = (req, res) => {
  const response = new Responsender();
  const user = users.find((c) => c.email === req.body.email);
  response.successful(STATUS_CODE_OK, 'User is successfully logged in', {
    token: encrypter(user.userId),
  });
  return response.send(res);
};
