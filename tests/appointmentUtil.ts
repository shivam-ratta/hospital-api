import AppointmentModel from '../models/AppointmentModel';

/** Utility fx for database level creation of test appointments. Does not use
 * Express routes.
 */
const createAppointment = (data, callback) => {
    new AppointmentModel(data).save().then((res, err) => {
        callback(res, err);
    })
}

/** Utility fx for database level appointment removal. Does not use Express routes. */
const dropAppointmentByStartTime = (startTime, handleError) => {
    AppointmentModel.deleteMany({ startTime }, function (err) {
        if (err) return handleError(err)
        // deleted at most one appointment document
    })
}

export default {
    createAppointment,
    dropAppointmentByStartTime
}
