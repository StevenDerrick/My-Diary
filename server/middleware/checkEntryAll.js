import entries from '../models/Entries';
import Responsender from '../helpers/responseHandler';

export default async (req, res, next) => {
  const response = new Responsender();
  const entry = entries.filter((c) => c.userId === req.userData.userId);

  if (entry.length === 0) {
    response.error(404, 'You do not have any Entry yet, create an entry and try again');
    return response.send(res);
  }
  next();
};
