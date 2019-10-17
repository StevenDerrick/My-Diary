import bcrypt from 'bcrypt';
import users from '../models/Users';

export default async (req, res, next) => {
  const user = users.find((c) => c.email === req.body.email);
  if (!user) {
    const status = 404;
    return res.status(status).json({
      status,
      error: 'Invalid email or password',
    });
  }
  bcrypt.compare(req.body.password, user.password, (err, userPassword) => {
    if (userPassword) {
      return next();
    }
    return res.status(404).json({
      status: 404,
      error: 'Invalid email or password',
    });
  });
};
