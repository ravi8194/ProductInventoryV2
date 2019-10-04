const Joi = require('@hapi/joi');

const schema = {
  signup: {
    userName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(10)
      .regex(/^[a-zA-Z0-9]{3,30}$/),
    role: Joi.string().required()
  },
  login: {
    userName: Joi.string().required(),
    password: Joi.string()
      .min(5)
      .max(10)
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  }
};

module.exports = schema;
