const Joi = require('@hapi/joi');

const productSchema = Joi.object().keys({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  rating: Joi.number().required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  status: Joi.string().required(),
  seller: Joi.string().required(),
  description: Joi.string().required(),
  isArchived: Joi.boolean()
});

module.exports = productSchema;
