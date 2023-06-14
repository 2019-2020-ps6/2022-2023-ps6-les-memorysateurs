const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
    patientId: Joi.number(),
    titre: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required(),
})