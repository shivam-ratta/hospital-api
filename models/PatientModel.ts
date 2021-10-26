import { Schema, model } from 'mongoose';
import toJson from '@meanie/mongoose-to-json';

const PatientSchema = new Schema({
	'name': String,
	'phone': String,
	'address': String,
	'petName': String,
	'petType': String
}).plugin(toJson);

export = model('Patient', PatientSchema);
