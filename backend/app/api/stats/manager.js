const { Stats } = require('../../models')
const NotFoundError = require('../../utils/errors/not-found-error.js')




const filtrerStatsFromPatient = (idPatient) => {
    const stats = Stats.get()
    return stats.filter((stats) => stats.patientId === idPatient)
}



module.exports = {
    filtrerStatsFromPatient,
}