const Joi = require("joi");

module.exports.add = {
  body: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    cart: Joi.array().items(Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1)
    }))
  })
}