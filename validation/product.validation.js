const Joi = require("joi");

module.exports.getMinInfoByIdArray = {
  body: Joi.object({
    productId: Joi.array().items(Joi.string()) 
  })
}