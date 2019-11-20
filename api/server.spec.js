const request = require('supertest');

const server = require('./server.js');

it("should set db environment to testing", function() {
    expect(process.env.DB_ENV).toBe("testing");
});

describe("server", function() {
    describe("GET /", function() {
        // the endpoint should return the correct http status code
        it("should return 200 OK", function() {
            return request(server)
                    .get("/")
                    .then(res => {
                        expect(res.status).toBe(200)
                    });
        });
        // the enpoint returns the correct data format
        it("should return JSON formatted response", function() {
            return request(server)
                    .get("/")
                    .then(res => {
                        expect(res.type).toMatch(/json/i)
                    });
        });
        // the endpoint returns the right data in the body based on input
        it("should return an 'api property with the value 'up' inside the body", function() {
            return request(server)
                    .get("/")
                    .then(res => {
                        expect(res.body).toEqual({ api: "up" })
                    });
        })
    })
})