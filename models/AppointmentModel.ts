import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const AppointmentSchema = new Schema({
	'patient' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Patient'
	},
	'startTime' : Date,
	'endTime' : Date,
	'description' : String,
	'fee' : Number,
	'feeCurrency' : String,
	'isFeePaid' : Boolean
}).plugin(toJson);

export = model('Appointment', AppointmentSchema);
