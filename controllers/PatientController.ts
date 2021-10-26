import PatientModel from '../models/PatientModel';

/**
 * PatientController.ts
 *
 * @description :: Server-side logic for managing Patients.
 */
export = {

    /**
     * PatientController.list()
     */
    list: function (req, res) {
        PatientModel.find((err, Patients) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Patient.',
                    error: err
                });
            }

            return res.json(Patients);
        });
    },

    /**
     * PatientController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        PatientModel.findOne({_id: id}, (err, Patient) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Patient.',
                    error: err
                });
            }

            if (!Patient) {
                return res.status(404).json({
                    message: 'No such Patient'
                });
            }

            return res.json(Patient);
        });
    },

    /**
     * PatientController.create()
     */
    create: function (req, res) {
        const Patient = new PatientModel({
			name : req.body.name,
			phone : req.body.phone,
			address : req.body.address,
			petName : req.body.petName,
			petType : req.body.petType
        });

        Patient.save((err, Patient) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Patient',
                    error: err
                });
            }

            return res.status(201).json(Patient);
        });
    },

    /**
     * PatientController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        PatientModel.findOne({_id: id}, (err, Patient) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Patient',
                    error: err
                });

            }
            if (!Patient) {
                return res.status(404).json({
                    message: 'No such Patient'
                });
            }

            Patient.name = req.body.name ? req.body.name : Patient.name;
			Patient.phone = req.body.phone ? req.body.phone : Patient.phone;
			Patient.address = req.body.address ? req.body.address : Patient.address;
			Patient.petName = req.body.petName ? req.body.petName : Patient.petName;
			Patient.petType = req.body.petType ? req.body.petType : Patient.petType;
			
            Patient.save((err, Patient) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Patient.',
                        error: err
                    });
                }

                return res.json(Patient);
            });
        });
    },

    /**
     * PatientController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        PatientModel.findByIdAndRemove(id, (err, Patient) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Patient.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
