import entries from '../models/Entries';

export default async (req, res, next) => {
  const entry = entries.filter((c) => c.userId === req.userData.userId);

  if (entry.length === 0) {
    return res.status(400).json({
      status: 400,
      error: 'You do not have any Entry yet, create an entry and try again',
    });
  }
  next();
};
