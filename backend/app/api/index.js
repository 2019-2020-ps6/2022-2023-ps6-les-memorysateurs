const { Router } = require('express')
const PatientRouter = require('./patient')
const ErgoRouter = require('./ergo')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/patient', PatientRouter)
router.use('/ergo', ErgoRouter)

module.exports = router
