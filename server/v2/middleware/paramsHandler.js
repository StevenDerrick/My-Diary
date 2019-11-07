import Joi from 'joi';
import { joiValidate, exportResult } from '../../helpers/joiHandler';

export default async (req, res, next) => {
  const schema = {
    entryId: Joi.string()
      .regex(/^\d+$/)
      .error(() => ({
        message: ' entryId must be an integer',
      })),

  };

  const result = exportResult(req.params, schema);
  if (result.error) {
    return joiValidate(res, req.params, schema);
  }
  next();
};
