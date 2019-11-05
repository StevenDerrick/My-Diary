import Joi from 'joi';
import { joiValidate, exportResult } from '../helpers/joiHandler';

export default async (req, res, next) => {
  const schema = {
    title: Joi.string()
      .min(5)
      .required()
      .error(() => ({
        message: ' Title is required and must be above 5 characters.',
      })),
    description: Joi.string()
      .min(5)
      .required()
      .error(() => ({
        message: ' description is required and must be above 5 characters.',
      })),
  };
  const result = exportResult(req.body, schema);
  if (result.error) {
    return joiValidate(res, req.body, schema);
  }
  next();
};
