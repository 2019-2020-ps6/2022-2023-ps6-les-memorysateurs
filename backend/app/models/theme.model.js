const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
    idErgo: Joi.number().required(),
    nom: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
})