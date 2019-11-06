import Responsender from '../helpers/responseHandler';
import { UNAUTHORIZED_STATUS_CODE } from '../helpers/statusCodeHandler';
import { decrypter } from '../helpers/tokenHandler';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = decrypter(token);
    req.userData = decodedToken;
    next();
  } catch (error) {
    const response = new Responsender();
    response.error(UNAUTHORIZED_STATUS_CODE, 'Forbidden: You must login to proceed');
    return response.send(res);
  }
};
