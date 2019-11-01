import entries from '../models/Entries';
import Responsender from '../helpers/responseHandler';
import { NOT_FOUND_STATUS_CODE } from '../helpers/statusCodeHandler';

export default async (req, res, next) => {
  const response = new Responsender();
  const entry = entries.filter((c) => c.userId === req.userData.userId);
  const entryFind = entry.find((c) => c.id === parseInt(req.params.entryId));

  if (entry.length === 0) {
    response.error(NOT_FOUND_STATUS_CODE, 'You do not have any Entry yet, create an entry and try again');
    return response.send(res);
  }
  if (!entryFind) {
    response.error(NOT_FOUND_STATUS_CODE, 'You do not have any entry with ID ' + `${req.params.entryId}`);
    return response.send(res);
  }
  next();
};
