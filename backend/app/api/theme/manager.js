const { Ergo, Theme } = require('../../models')
const NotFoundError = require('../../utils/errors/not-found-error.js')




const filtrerThemesFromErgo = (idErgo) => {
    const themes = Theme.get()
    return themes.filter((theme) => theme.idErgo === idErgo)
}

const getThemeFromErgo = (ergoId, themeId) => {
    const themesErgo = filtrerThemesFromErgo(ergoId);
    const themeIdInt = parseInt(themeId, 10);
    const theme = themesErgo.find((theme) => theme.id === themeIdInt
    );
    if (!theme || theme.id !== themeIdInt) {
        throw new NotFoundError(`${themeId} was not found for ergoId=${ergoId}`);
    }
    return theme;
};

module.exports = {
    filtrerThemesFromErgo,
    getThemeFromErgo,
}