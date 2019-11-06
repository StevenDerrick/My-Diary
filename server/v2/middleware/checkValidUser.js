import Responsender from '../../helpers/responseHandler';
import { select } from '../../helpers/sqlQueries';
import { STATUS_CODE_FORBIDDEN } from '../../helpers/statusCodeHandler';
import { decrypter } from '../../helpers/tokenHandler';

export default async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = decrypter(token);
  req.userData = decodedToken;
  const rows = await select('*', 'users', `userid='${req.userData.userId}'`);
  if (rows.length === 0) {
    const response = new Responsender();
    response.error(STATUS_CODE_FORBIDDEN, 'Sorry: This token does not belong to a valid user');
    return response.send(res);
  }
  next();
};
