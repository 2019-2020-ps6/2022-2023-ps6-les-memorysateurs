const { Patient, Theme } = require('../../models')
const NotFoundError = require('../../utils/errors/not-found-error.js')




const filtrerThemesFromPatient = (idPatient) => {
    const themes = Theme.get()
    return themes.filter((theme) => theme.patientId === idPatient || theme.patientId === undefined)
}



const getThemeFromPatient = (themeId) => {
    const themeIdInt = parseInt(themeId, 10);
    const theme = Theme.find((theme) => theme.id === themeIdInt
    );
    
    if (!theme) {
        throw new NotFoundError(`${themeId} was not found`);
    }
    return theme;
};

module.exports = {
    filtrerThemesFromPatient,
    getThemeFromPatient,
}