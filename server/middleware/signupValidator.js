import Joi from 'joi';

export default async (req, res, next) => {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .required()
      .error(() => ({
        message: ' First name is required.',
      })),
    lastName: Joi.string()
      .min(3)
      .required()
      .error(() => ({
        message: ' Last name is required.',
      })),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .error(() => ({
        message: ' Email is required and must be valid.',
      })),
    password: Joi.string()
      .regex(/^[a-zA-Z]\w{3,14}$/)
      .required()
      .error(() => ({
        message: ' Password is required and must have atleast 4 characters to 15, no characters other than letters, numbers and underscore.',
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
