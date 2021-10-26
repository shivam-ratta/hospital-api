import request from "supertest";
import app from "../app";

describe("Hospital API", () => {
    test("Get Weekly Balance", async function () {
        const response = await request(app).get('/hospital/balance')
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(4);
        expect(response.body[0]).toHaveProperty('balance');
        expect(response.body[0]).toHaveProperty('startDate');
        expect(response.body[0]).toHaveProperty('endDate');
    })
});