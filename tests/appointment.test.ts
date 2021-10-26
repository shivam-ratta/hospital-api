import request from "supertest";
import util from './appointmentUtil';
import patientUtil from './patientUtil';
import app from "../app";

let testAppointment = null;
let testPatient = null;

describe("Appointment API", () => {
    beforeAll((done) => {
        let date = new Date('2002-02-02');
        util.dropAppointmentByStartTime(date, console.warn);
        const data = {
            "startTime": date,
            "endTime": date,
            "fee": 10,
            "feeCurrency": "USD",
            "isFeePaid": true
        }
        util.createAppointment(data, (createdAppointment, err) => {
            expect(err).toBeUndefined()
            expect(createdAppointment.fee).toEqual(10)
            expect(createdAppointment).toHaveProperty('id')
            testAppointment = createdAppointment
        })
        patientUtil.dropPatientByPhone('5555566666', console.warn);
        const data2 = {
            "name": "Test User",
            "phone": '5555566666',
            "address": "Test Address",
            "petName": "Romeo",
            "petType": "Dog"
        }
        patientUtil.createPatient(data2, (createdPatient, err) => {
            expect(err).toBeUndefined()
            expect(createdPatient.phone).toBe('5555566666')
            expect(createdPatient).toHaveProperty('id')
            testPatient = createdPatient
            done()
        })
    });
    test("Get All Appointments", async function () {
        const response = await request(app).get('/appointment')
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    })
    test("Get Unpaid Appointments", async function () {
        const response = await request(app).get('/appointment/unpaid')
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    })
    test("Get Unpaid Appointments by patient", async function () {
        const response = await request(app).get('/appointment/unpaid/6176c0a5a577b47be40cce00')
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    })
    test("Get Unpaid Appointments by patient", async function () {
        const response = await request(app).get('/appointment/unpaid/6176c0a5a577b47be40cce00')
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    })
    test("Add Appointment", async function () {
        const date = new Date('2003-03-03');
        const response = await request(app).post('/appointment').send({
            "patient": testPatient.id,
            "startTime": date,
            "endTime": date,
            "fee": 15,
            "feeCurrency": "USD",
            "isFeePaid": true
        })
        expect(response.statusCode).toBe(201);
        expect(response.body.fee).toEqual(15)
        expect(response.body.patient).toBe(testPatient.id);
        expect(response.body).toHaveProperty('id')
        util.dropAppointmentByStartTime(date, console.warn);
    })
    test("Update Appointment", async function () {
        const date = new Date();
        const response = await request(app).put('/appointment/' + testAppointment.id).send({
            "patient": testPatient.id,
            "startTime": date,
            "endTime": date,
            "fee": 20,
            "feeCurrency": "USD",
            "isFeePaid": true
        })
        expect(response.statusCode).toBe(200);
        expect(response.body.patient).toBe(testPatient.id);
        expect(response.body.fee).toEqual(20)
        expect(response.body).toHaveProperty('id')
    })
    afterAll((done) => {
        request(app).delete('/appointment/' + testAppointment.id).then(response => {
            expect(response.statusCode).toBe(204);
        });

        request(app).delete('/patient/' + testPatient.id).then(response => {
            expect(response.statusCode).toBe(204);
        });
        done();
    });
});