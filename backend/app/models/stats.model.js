const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Stats', {
    patientId: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.number().required(),
    nbCarte: Joi.number().required(),
    stade: Joi.number().required(),
    nbErreurs: Joi.number().required(),
    nbIndices: Joi.number().required(),
    nbEssais: Joi.number().required(),
})
