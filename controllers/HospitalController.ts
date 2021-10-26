import moment from 'moment';

import AppointmentModel from '../models/AppointmentModel';
import CurrencyExchange from '../services/currencyExchange';

/**
 * HospitalController.ts
 *
 * @description :: Server-side logic for managing Appointments.
 */
export = {

    /**
     * HospitalController.balance()
     */
    balance: async function (req, res) {
        try {
            const data = [];
            const rates = await CurrencyExchange.getRates();
            const appointments = await AppointmentModel.find({
                startTime: {
                    $gte: moment().subtract(1, 'month').toDate(),
                }
            });
            for (let i = 4; i > 0; i--) {
                const endDate = moment().subtract(i - 1, 'week').startOf('day').toDate();
                const startDate = moment().subtract(i, 'week').startOf('day').toDate();
                let balance: any = 0;
                appointments.forEach(el => {
                    const elTime = moment(el.startTime).startOf('day').toDate();
                    if (startDate < elTime && endDate >= elTime && el.fee && rates[el.feeCurrency.toUpperCase()]) {
                        balance += el.fee / rates[el.feeCurrency.toUpperCase()];
                    }
                })
                data.push({
                    startDate: moment(startDate).add(1, 'day').format('YYYY-MM-DD'),
                    endDate: moment(endDate).format('YYYY-MM-DD'),
                    balance: +balance.toFixed(2)
                })
            }
            return res.json(data);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting Appointment.',
                error: err
            });
        }
    },
};
