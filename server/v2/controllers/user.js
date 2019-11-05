import express from 'express';
import bcrypt from 'bcrypt';
import { encrypter } from '../../helpers/tokenHandler';
import Responsender from '../../helpers/responseHandler';
import { insert, select } from '../../helpers/sqlQueries';
import { STATUS_CODE_CREATED, STATUS_CODE_OK } from '../../helpers/statusCodeHandler';

const app = express();
app.use(express.json);

export const usersSignUp = async (req, res) => {
  const response = new Responsender();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  class User {
    constructor() {
      this.firstName = req.body.firstName;
      this.lastName = req.body.lastName;
      this.email = req.body.email;
      this.password = hashedPassword;
    }
  }

  const newUser = new User();

  await insert('users', 'firstName, lastName, email, password', '$1, $2, $3, $4',
    [newUser.firstName, newUser.lastName, newUser.email, newUser.password]);
  const idDone = await select('userid, email', 'users', `email='${req.body.email}'`);

  response.successful(STATUS_CODE_CREATED, 'User created successfully', {
    token: encrypter(idDone[0].userid),
  });
  return response.send(res);
};

export const usersSignIn = async (req, res) => {
  const response = new Responsender();
  const rows = await select('userid', 'users', `email='${req.body.email}'`);

  response.successful(STATUS_CODE_OK, 'User is successfully logged in', {
    token: encrypter(rows[0].userid),
  });
  return response.send(res);
};
