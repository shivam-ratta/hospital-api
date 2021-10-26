import AppointmentModel from '../models/AppointmentModel';

/**
 * AppointmentController.ts
 *
 * @description :: Server-side logic for managing Appointments.
 */
export = {

    /**
     * AppointmentController.list()
     */
    list: function (req, res) {
        let query: any = {};
        if (req.query.date) {
            const nextDay = new Date(req.query.date);
            nextDay.setDate(nextDay.getDate() + 1);
            query.startTime = { $gte: new Date(req.query.date), $lt: nextDay };
        }
        AppointmentModel.find(query, (err, Appointments) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Appointment.',
                    error: err
                });
            }

            return res.json(Appointments);
        });
    },

    /**
     * AppointmentController.unpaid()
     */
    unpaid: function (req, res) {
        let query: any = { isFeePaid: false };
        if (req.params.id) {
            query.patient = req.params.id;
        }
        AppointmentModel.find(query, (err, Appointments) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Appointment.',
                    error: err
                });
            }

            return res.json(Appointments);
        });
    },

    /**
     * AppointmentController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        AppointmentModel.findOne({ _id: id }, (err, Appointment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Appointment.',
                    error: err
                });
            }

            if (!Appointment) {
                return res.status(404).json({
                    message: 'No such Appointment'
                });
            }

            return res.json(Appointment);
        });
    },

    /**
     * AppointmentController.create()
     */
    create: function (req, res) {
        const Appointment = new AppointmentModel({
            patient: req.body.patient,
            startTime: new Date(req.body.startTime),
            endTime: new Date(req.body.endTime),
            description: req.body.description,
            fee: req.body.fee,
            feeCurrency: req.body.feeCurrency,
            isFeePaid: req.body.isFeePaid
        });

        Appointment.save((err, Appointment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Appointment',
                    error: err
                });
            }

            return res.status(201).json(Appointment);
        });
    },

    /**
     * AppointmentController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        AppointmentModel.findOne({ _id: id }, (err, Appointment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Appointment',
                    error: err
                });

            }
            if (!Appointment) {
                return res.status(404).json({
                    message: 'No such Appointment'
                });
            }

            Appointment.patient = req.body.patient ? req.body.patient : Appointment.patient;
            Appointment.startTime = req.body.startTime ? req.body.startTime : new Date(Appointment.startTime);
            Appointment.endTime = req.body.endTime ? req.body.endTime : new Date(Appointment.endTime);
            Appointment.description = req.body.description ? req.body.description : Appointment.description;
            Appointment.fee = req.body.fee ? req.body.fee : Appointment.fee;
            Appointment.feeCurrency = req.body.feeCurrency ? req.body.feeCurrency : Appointment.feeCurrency;
            Appointment.isFeePaid = req.body.isFeePaid !== null ? req.body.isFeePaid : Appointment.isFeePaid;

            Appointment.save((err, Appointment) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Appointment.',
                        error: err
                    });
                }

                return res.json(Appointment);
            });
        });
    },

    /**
     * AppointmentController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        AppointmentModel.findByIdAndRemove(id, (err, Appointment) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Appointment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
