import jwt from 'jsonwebtoken';
import Responsender from '../helpers/responseHandler';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    const response = new Responsender();
    response.error(401, 'Forbidden: You must login to proceed');
    return response.send(res);
  }
};
