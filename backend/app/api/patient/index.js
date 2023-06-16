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

router.post('/:patientId', (req, res) => {
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
    let patient = Patient.create(patientToCreate)
    res.status(201).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }

})

router.put('/:patientId', (req, res) => {
  let patientUpdate;
  let updatedPatient;
  try {
      patientUpdate = req.body
      updatedPatient = Patient.update(parseInt(req.params.patientId, 10), patientUpdate)
      res.status(200).json(updatedPatient)
  } catch (err) {
      manageAllErrors(res, err)
  }


})


router.delete('/:patientId', (req, res) => {
  try {
    Patient.delete(parseInt(req.params.patientId, 10))
    res.status(200).json(filterPatientsFromErgo(req.query.ergoId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})


module.exports = router
