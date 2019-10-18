import Joi from 'joi';

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

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }
  next();
};
