import Joi from 'joi';
import { joiValidate, exportResult } from '../helpers/joiHandler';

export default async (req, res, next) => {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required()
      .error(() => ({
        message: ' Title is required and must be max 50 and min 5 characters.',
      })),
    description: Joi.string()
      .min(5)
      .max(500)
      .required()
      .error(() => ({
        message: ' description is required and must be max 500 and min 5 characters.',
      })),
  };
  const result = exportResult(req.body, schema);
  if (result.error) {
    return joiValidate(res, req.body, schema);
  }
  next();
};
