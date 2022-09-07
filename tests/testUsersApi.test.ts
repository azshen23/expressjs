const request = require("supertest")("https://api1.nuocal.com");
const expect = require("chai").expect;
require("dotenv").config();

describe("GET /getUser", function () {
  it("returns an object of the request user", async function () {
    const response = await request
      .get("/getUser?input=1")
      .set("Authorization", "bearer " + process.env.AUTH_TOKEN);

    expect(response.status).to.eql(200);
  });

  it("returns a list of posts from the user has created", async function () {
    const response = await request
      .get("/getUserPosts?input=1")
      .set("Authorization", "bearer " + process.env.AUTH_TOKEN);

    expect(response.status).to.eql(200);
  });
});
