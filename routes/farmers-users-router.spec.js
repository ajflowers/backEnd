const request = require("supertest");
const server = require("../api/server.js");


describe("farmer router", function() {
    describe("GET /", function() {
        it("should return 200 OK", function() {
            return request(server)
                  .get("/api/farmers")
                  .then(res => {
                      expect(res.status).toBe(200)
                  });
        });
        it("should return JSON formatted response", function() {
            return request(server)
              .get("/api/farmers")
              .then(res => {
                expect(res.type).toMatch(/json/i);
              });
        });
      
        it("should return an 'username' property inside the body", function() {
            return request(server)
              .get("/api/farmers")
              .then(res => {
                expect(res.body.username);
              });
        });
    });
});
