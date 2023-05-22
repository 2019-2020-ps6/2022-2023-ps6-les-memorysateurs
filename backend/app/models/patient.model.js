const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Patient', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  ergoId: Joi.number().required(),
  stade : Joi.number().required(),
  photo : Joi.string().required(),
})
