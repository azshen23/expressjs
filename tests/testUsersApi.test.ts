const request = require("supertest")("https://api1.nuocal.com");
const expect = require("chai").expect;
require("dotenv").config();

describe("GET /getUser", function () {
  it("returns an object of the request user", async function () {
    const response = await request
      .get("/getUser?input=1")
      .set("Authorization", "bearer " + process.env.AUTH_TOKEN);

    expect(response.status).to.eql(200);
    expect(response.body.result.data).to.eql({
      id: 1,
      name: "Andrew",
      username: "azshen23",
      email: "azshen23@gmail.com",
      verified: false,
      pfpurl: "hello",
      streak: 0,
    });
  });

  it("returns a list of posts from the user has created", async function () {
    const response = await request
      .get("/getUserPosts?input=1")
      .set("Authorization", "bearer " + process.env.AUTH_TOKEN);

    expect(response.status).to.eql(200);
    expect(response.body.result.data[0]).to.eql({
      id: 1,
      authorid: 1,
      dateposted: "some time",
      title: "your mom",
      content: "your mother is very hot ",
    });
  });
});
