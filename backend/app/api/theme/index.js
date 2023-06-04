const { Router } = require('express')

const { Theme, Patient} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const { filtrerThemesFromPatient, getThemeFromPatient } = require('./manager')

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
    try {
        // Check if the theme id exists & if the theme has the same patientId as the one provided in the url.
        const theme = getThemeFromPatient(req.query.patientId, req.params.themeId)

        const themeUpdate = req.body
        themeUpdate.patientId = theme.patientId

        const updatedTheme = Theme.update(req.params.themeId, themeUpdate)
        res.status(200).json(updatedTheme)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:themeId', (req, res) => {
    try {
        Theme.delete(req.params.themeId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router