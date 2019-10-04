const userJoiSchema = require('../joi/user');
const joi = require('@hapi/joi');

module.exports = {
  loginValidation: (req, res, next) => {
    const body = req.body;
    const value = joi.validate(body, userJoiSchema.login);
    if (value.error) {
      return res.json({
        success: 0,
        message: value.error.details[0].message
      });
    } else {
      next();
    }
  },
  signupValidation: (req, res, next) => {
    const body = req.body;
    const value = joi.validate(body, userJoiSchema.signup);
    if (value.error) {
      return res.json({
        success: 0,
        message: value.error.details[0].message
      });
    } else {
      next();
    }
  }
};
