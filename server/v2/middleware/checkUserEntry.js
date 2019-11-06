import { select } from '../../helpers/sqlQueries';
import Responsender from '../../helpers/responseHandler';
import { NOT_FOUND_STATUS_CODE } from '../../helpers/statusCodeHandler';

export default async (req, res, next) => {
  const response = new Responsender();
  const rows = await select('userid, id', 'entries', `userid='${req.userData.userId}'`);
  const entryFind = rows.find((c) => c.id === parseInt(req.params.entryId));

  if (rows.length === 0) {
    response.error(NOT_FOUND_STATUS_CODE, 'You do not have any Entry yet, create an entry and try again');
    return response.send(res);
  }
  if (!entryFind) {
    response.error(NOT_FOUND_STATUS_CODE, 'You do not have any entry with ID ' + `${req.params.entryId}`);
    return response.send(res);
  }
  next();
};
