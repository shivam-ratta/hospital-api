import request from "supertest";
import util from './patientUtil'
import app from "../app";

let testPatient = null;
describe("Appointment API", () => {
    beforeAll((done) => {
        util.dropPatientByPhone('0123456789', console.warn);
        util.dropPatientByPhone('0012345678', console.warn);
        const data = {
            "name": "Test User",
            "phone": '0123456789',
            "address": "Test Address",
            "petName": "Romeo",
            "petType": "Dog"
        }
        util.createPatient(data, (createdPatient, err) => {
            expect(err).toBeUndefined()
            expect(createdPatient.phone).toBe('0123456789')
            testPatient = createdPatient
            expect(createdPatient).toHaveProperty('id')
        })
        done()
    });
    test("Get All Patients", async function () {
        const response = await request(app).get('/patient')
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    })
    test("Get Patient by id", async function () {
        const response = await request(app).get('/patient/' + testPatient.id)
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    })
    test("Add Patient", async function () {
        const response = await request(app).post('/patient').send({
            "name": "Test User",
            "phone": '1234567890',
            "address": "Test Address",
            "petName": "Juliet",
            "petType": "Cat"
        })
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.phone).toBe('1234567890');
        util.dropPatientByPhone('1234567890', console.warn);
    })
    test("Update Patient", async function () {
        const response = await request(app).put('/patient/' + testPatient.id).send({
            "name": "Test User2",
            "phone": '0012345678',
            "address": "Test Address2",
            "petName": "Rancho",
            "petType": "Monkey"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.phone).toBe('0012345678');
    })
    afterAll((done) => {
        request(app).delete('/patient/' + testPatient.id).then(response => {
            expect(response.statusCode).toBe(204);
            done();
        });
    });
});