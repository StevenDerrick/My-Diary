import users from '../models/Users';

export default async (req, res, next) => {
  const user = users.find((c) => c.email === req.body.email);
  if (user) {
    const status = 422;
    return res.status(status).json({
      status,
      error: 'email already taken',
    });
  }
  next();
};
