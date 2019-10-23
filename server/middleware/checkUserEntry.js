import entries from '../models/Entries';

export default async (req, res, next) => {
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const entryFind = entry.find((c) => c.id === parseInt(req.params.entryId));

  if (entry.length === 0) {
    return res.status(404).json({
      status: 404,
      error: 'You do not have any Entry yet, create an entry and try again',
    });
  }
  if (!entryFind) {
    const status = 404;
    return res.status(status).json({
      status,
      error: 'You do not have any entry with ID ' + `${req.params.entryId}`,
    });
  }
  next();
};
