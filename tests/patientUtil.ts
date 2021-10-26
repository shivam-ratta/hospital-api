import PatientModel from '../models/PatientModel';

/** Utility fx for database level creation of test patients. Does not use
 * Express routes.
 */
const createPatient = (data, callback) => {
    new PatientModel(data).save().then((res, err) => {
        callback(res, err);
    })
}

/** Utility fx for database level patient removal. Does not use Express routes. */
const dropPatientByPhone = (phone, handleError) => {
    PatientModel.deleteMany({ phone }, function (err) {
        if (err) return handleError(err)
        // deleted at most one patient document
    })
}

export default {
    createPatient,
    dropPatientByPhone
}
