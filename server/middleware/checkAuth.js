import jwt from 'jsonwebtoken';
import Responsender from '../helpers/responseHandler';
import { UNAUTHORIZED_STATUS_CODE } from '../helpers/statusCodeHandler';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    const response = new Responsender();
    response.error(UNAUTHORIZED_STATUS_CODE, 'Forbidden: You must login to proceed');
    return response.send(res);
  }
};
