import { select } from '../helpers/sqlQueries';
import Responsender from '../helpers/responseHandler';
import { UNPROCESSABLE_ENTITY_STATUS_CODE } from '../helpers/statusCodeHandler';

export default async (req, res, next) => {
  const response = new Responsender();
  const rows = await select('email', 'users', `email='${req.body.email}'`);
  if (rows[0]) {
    response.error(UNPROCESSABLE_ENTITY_STATUS_CODE, 'email already exists');
    return response.send(res);
  }
  next();
};
