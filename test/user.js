process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe("Users", function() {
  describe("GET/users", function() {
    it("should get all the users", function(done) {
      var user = {
        username: "firstusername",
        password: "firstuserpassword"
      };

      var agent = chai.request.agent(server);
      agent
        .post("/login")
        .send(user)
        .end(function(err, res) {
          res.should.have.status(200);
          return agent.get("/users").then(function(res) {
            res.should.have.status(200);
            done();
          });
        });
    });
  });
});
