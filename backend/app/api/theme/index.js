const { Router } = require('express')

const { Theme, Patient} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { filtrerThemesFromPatient, getThemeFromPatient } = require('./manager')
const { getById } = require('../../models/patient.model')

const router = new Router()

router.get('/', (req, res) => {
    try {
        // Check if patientId exists, if not it will throw a NotFoundError
        Patient.getById(req.query.patientId)
    
        res.status(200).json(filtrerThemesFromPatient(req.query.patientId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:themeId', (req, res) => {
    try {
        // Check if patientId exists, if not it will throw a NotFoundError
        Patient.getById(req.query.patientId)
        res.status(200).json(getThemeFromPatient(req.query.patientId, req.params.themeId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})


router.post('/', (req, res) => {
    try {
        // Check if patient exists, if not it will throw a NotFoundError
        Patient.getById(req.query.patientId)
        const themeToCreate = req.body
        themeToCreate.patientId = req.query.patientId
        const theme = Theme.create(themeToCreate)
        res.status(201).json(theme)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:themeId', (req, res) => {
    let themeUpdate;
    let updatedTheme;
    try {

        themeUpdate = req.body
        updatedTheme = Theme.update(parseInt(req.params.themeId, 10), themeUpdate)
        res.status(200).json(updatedTheme)
    } catch (err) {
        manageAllErrors(res, err)
    }
    

})

router.delete('/:themeId', (req, res) => {
    try {
        Theme.delete(parseInt(req.params.themeId,10))
        res.status(200).json(filtrerThemesFromPatient(parseInt(req.query.patientId)))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router