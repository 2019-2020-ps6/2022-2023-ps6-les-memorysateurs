const { Router } = require('express')

const { Ergo } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Ergo.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:email/:password', (req, res) => {
  try {
    let all = Ergo.get()
    let ergo = all.find(ergo => ergo.email === req.params.email && ergo.password === req.params.password)
    res.status(200).json(ergo)
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

module.exports = router
