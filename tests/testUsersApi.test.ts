const request = require("supertest")("http:/localhost:3001");
const expect = require("chai").expect;

describe("GET /getUser", function () {
  it("returns an object of the request user", async function () {
    const response = await request.get("/getUser?input=1");

    expect(response.status).to.eql(200);
    expect(response.body.data.length).to.eql(30);
  });
});
