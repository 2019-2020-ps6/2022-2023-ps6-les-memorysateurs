const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Stats', {
    patientId: Joi.number().required(),
    date: Joi.string().required(),
    temps: Joi.number().required(),
    nbCartes: Joi.number().required(),
    stade: Joi.number().required(),
    erreurs: Joi.number().required(),
    indices: Joi.number().required(),
    essais: Joi.number().required(),

})
