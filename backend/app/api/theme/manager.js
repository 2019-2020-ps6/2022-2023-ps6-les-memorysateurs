const { Patient, Theme } = require('../../models')
const NotFoundError = require('../../utils/errors/not-found-error.js')




const filtrerThemesFromPatient = (idPatient) => {
    const themes = Theme.get()
    return themes.filter((theme) => theme.patientId === idPatient)
}

const getThemeFromPatient = (patientId, themeId) => {
    const themesPatient = filtrerThemesFromPatient(patientId);
    const themeIdInt = parseInt(themeId, 10);
    const theme = themesPatient.find((theme) => theme.id === themeIdInt
    );
    if (!theme || theme.id !== themeIdInt) {
        throw new NotFoundError(`${themeId} was not found for patientId=${patientId}`);
    }
    return theme;
};

module.exports = {
    filtrerThemesFromPatient,
    getThemeFromPatient,
}