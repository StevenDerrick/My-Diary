import entries from '../models/Entries';

export default async (req, res, next) => {
  const entry = entries.filter((c) => c.userId === req.userData.userId);

  if (entry.length === 0) {
    return res.status(404).json({
      status: 404,
      error: 'You do not have any Entry yet, create an entry and try again',
    });
  }
  next();
};
