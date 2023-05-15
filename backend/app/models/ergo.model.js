const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Ergo', {
  id: Joi.number().required(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
})
