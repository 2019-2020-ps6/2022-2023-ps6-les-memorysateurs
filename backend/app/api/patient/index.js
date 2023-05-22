const { Router } = require('express')

const { Ergo, Patient } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { filterPatientsFromErgoz, getPatientFromErgo } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if ergoId exists, if not it will throw a NotFoundError
    Ergo.getById(req.params.ergoId)
    res.status(200).json(filterPatientsFromErgoz(req.params.ergoId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:patientId', (req, res) => {
  try {
    const patient = getPatientFromErgo(req.params.ergoId, req.params.patientId)
    res.status(200).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if ergoId exists, if not it will throw a NotFoundError
    Ergo.getById(req.params.ergoId)
    const ergoId = parseInt(req.params.ergoId, 10)
    let patient = Patient.create({ label: req.body.label, ergoId })  
    res.status(201).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:patientId', (req, res) => {
  try {
    const patient = getPatientFromErgo(req.params.ergoId, req.params.patientId)
    const updatedPatient = Patient.update(req.params.patientId, { label: req.body.label, ergoId: patient.ergoId })
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
