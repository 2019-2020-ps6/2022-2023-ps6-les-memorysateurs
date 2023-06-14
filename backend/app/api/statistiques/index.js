const { Router } = require('express')

const { Statistiques, Patient} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const {filtrerStatsFromPatient} = require(".//manager");
const {stringify} = require("nodemon/lib/utils");

const router = new Router()

router.get('/', (req, res) => {
  try {
    // Check if patientId exists, if not it will throw a NotFoundError
    Patient.getById(req.query.patientId)

    res.status(200).json(filtrerStatsFromPatient(req.query.patientId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})


router.post('/', (req, res) => {
  try {
    // Check if patient exists, if not it will throw a NotFoundError
    Patient.getById(req.query.patientId)
    const statToCreate = req.body
    statToCreate.patientId = req.query.patientId
    const stat = Statistiques.create(statToCreate)
    res.status(201).json(stat)
  } catch (err) {
    manageAllErrors(res, err)
  }
})



module.exports = router

