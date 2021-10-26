import request from "supertest";
import app from "../app";

describe("Test the root path", () => {
  test("App working", async function () {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200);
    return;
  })
});