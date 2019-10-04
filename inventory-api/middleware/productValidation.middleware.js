const productJoiSchema = require('../joi/product');
const joi = require('@hapi/joi');

module.exports = {
  productValidate: (req, res, next) => {
    const body = req.body;

    const value = joi.validate(body, productJoiSchema);
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
