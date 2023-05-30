const { Router } = require('express')

const { Ergo, Patient, Theme} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { filterPatientsFromErgo, getPatientFromErgo } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if ergoId exists, if not it will throw a NotFoundError
    Ergo.getById(req.query.ergoId)
    res.status(200).json(filterPatientsFromErgo(req.query.ergoId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:patientId', (req, res) => {
  try {
    // Check if ergoId exists, if not it will throw a NotFoundError
    Ergo.getById(req.query.ergoId)
    const patient = getPatientFromErgo(req.query.ergoId, req.params.patientId)
    res.status(200).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if ergoId exists, if not it will throw a NotFoundError
    Ergo.getById(req.query.ergoId)
    const ergoId = parseInt(req.query.ergoId, 10)
    const patientToCreate = req.body
    patientToCreate.ergoId = ergoId
    console.log(patientToCreate)
    let patient = Patient.create(patientToCreate)
    res.status(201).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }

})

router.put('/:patientId', (req, res) => {

  try {
    // Check if the patient id exists & if the patient has the same ergoId as the one provided in the url.
    const patient = getPatientFromErgo(req.query.ergoId, req.params.patientId)

    const patientUpdate = req.body
    patientUpdate.ergoId = patient.ergoId

    const updatedPatient = Patient.update(req.params.patientId, patientUpdate)
    res.status(200).json(updatedPatient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:patientId', (req, res) => {
  try {
    // Check if the patient id exists & if the patient has the same ergoId as the one provided in the url.
    getPatientFromErgo(req.params.ergoId, req.params.patientId)
    Patient.delete(req.params.patientId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
