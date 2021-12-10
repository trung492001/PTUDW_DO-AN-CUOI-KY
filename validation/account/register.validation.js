const Joi = require('joi');
module.exports = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).message('Password must be at least eight characters, one letter and one number!'),
  confirmPassword: Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } })
})