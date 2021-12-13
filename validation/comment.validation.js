const Joi = require("joi");

module.exports.add = {
  body: Joi.object({
    productId: Joi.string().required(),
    anonymousUsername: Joi.string().allow("", null).default(null),
    content: Joi.string().required()
  })
}

module.exports.reply = {
  body: Joi.object({
    parentId: Joi.string().required(),
    anonymousUsername: Joi.string().allow("", null).default(null),
    content: Joi.string().required()
  })
}

module.exports.get = {
  query: Joi.object({
    productId: Joi.string().required(),
    page: Joi.number().integer().positive().default(1)
  })
}