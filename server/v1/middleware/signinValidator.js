import bcrypt from 'bcrypt';
import Responsender from '../helpers/responseHandler';
import { NOT_FOUND_STATUS_CODE } from '../helpers/statusCodeHandler';
import users from '../models/Users';

export default async (req, res, next) => {
  const response = new Responsender();
  const user = users.find((c) => c.email === req.body.email);
  if (!user) {
    response.error(NOT_FOUND_STATUS_CODE, 'Invalid email or password');
    return response.send(res);
  }
  bcrypt.compare(req.body.password, user.password, (err, userPassword) => {
    if (userPassword) {
      return next();
    }
    response.error(NOT_FOUND_STATUS_CODE, 'Invalid email or password');
    return response.send(res);
  });
};
