import users from '../models/Users';
import Responsender from '../helpers/responseHandler';

export default async (req, res, next) => {
  const response = new Responsender();
  const user = users.find((c) => c.email === req.body.email);
  if (user) {
    response.error(422, 'email already taken');
    return response.send(res);
  }
  next();
};
