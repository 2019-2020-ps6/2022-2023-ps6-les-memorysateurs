const { Ergo, Patient } = require('../../models')
const NotFoundError = require('../../utils/errors/not-found-error.js')

/**
 * Patients Manager.
 * This file contains all the logic needed to by the patient routes.
 */

/**
 * filterPatientsFromErgo.
 * This function filters among the patients to return only the patient linked with the given ergoId.
 * @param ergoId
 */
const filterPatientsFromErgo = (ergoId) => {
  const patients = Patient.get()
  const parsedId = parseInt(ergoId, 10)
  return patients.filter((patient) => patient.ergoId === parsedId)
}

/**
 * getPatientFromErgo.
 * This function retrieves a patient from a ergo. It will throw a not found exception if the ergoId in the patient is different from the one provided in parameter.
 * @param ergoId
 * @param patientId
 */
const getPatientFromErgo = (ergoId, patientId) => {
  // Check if ergoId exists, if not it will throw a NotFoundError
  const ergo = Ergo.getById(ergoId)
  const ergoIdInt = parseInt(ergoId, 10)
  const patient = Patient.getById(patientId)
  if (patient.ergoId !== ergoIdInt) throw new NotFoundError(`${patient.name} id=${patientId} was not found for ${ergo.name} id=${ergo.id} : not found`)
  return patient
}

module.exports = {
  filterPatientsFromErgo,
  getPatientFromErgo,
}
