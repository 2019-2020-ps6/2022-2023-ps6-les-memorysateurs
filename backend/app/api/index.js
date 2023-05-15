const { Router } = require('express')
const PatientRouter = require('./patient')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/patient', PatientRouter)

module.exports = router
