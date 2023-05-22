const { Router } = require('express')

const { Stats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/:patientId', (req, res) => {
  try {
    res.status(200).json(Patient.getById(req.params.patientId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const patient = Patient.create({ ...req.body })
    res.status(201).json(patient)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:patientId', (req, res) => {
  try {
    res.status(200).json(Patient.update(req.params.patientId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:patientId', (req, res) => {
  try {
    Patient.delete(req.params.patientId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
