const { Router } = require('express')
const PatientRouter = require('./patient')
const ErgoRouter = require('./ergo')
const ThemeRouter = require('./theme')
const StatRouter = require('./statistiques')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/patient', PatientRouter)
router.use('/ergo', ErgoRouter)
router.use('/theme', ThemeRouter)
router.use('/statistiques', StatRouter)

module.exports = router
