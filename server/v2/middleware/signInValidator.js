
import bcrypt from 'bcrypt';
import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
  const rows = await select('email, password', 'users', `email='${req.body.email}'`);
  if (!rows[0]) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  }
  bcrypt.compare(req.body.password, rows[0].password, (err, userPassword) => {
    if (userPassword) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  });
};