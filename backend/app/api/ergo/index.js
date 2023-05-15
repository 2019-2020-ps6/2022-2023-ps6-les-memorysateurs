const { Router } = require('express')

const { Ergo } = require('../../models')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Ergo.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:ergoId', (req, res) => {
  try {
    res.status(200).json(Ergo.getById(req.params.ergoId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const ergo = Ergo.create({ ...req.body })
    res.status(201).json(ergo)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:ergoId', (req, res) => {
  try {
    res.status(200).json(Ergo.update(req.params.ergoId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:ergoId', (req, res) => {
  try {
    Ergo.delete(req.params.ergoId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
