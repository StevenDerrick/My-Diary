import Joi from 'joi';
import Responsender from './responseHandler';

export const joiValidate = (res, body, schema) => {
  const response = new Responsender();
  const result = Joi.validate(body, schema);
  response.error(400, `${result.error.details[0].message}`);
  return response.send(res);
};

export const exportResult = (body, schema) => {
  const result = Joi.validate(body, schema);
  return result;
};
