process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe("Users", function() {
  describe("GET/users", function() {
    it("should get all the users", function(done) {
      chai
        .request(server)
        .get("/users")
        .end(function(err, res) {
          console.log("error" + err);
          console.log("res" + res);
          console.log(res.body);
          res.should.have.status(200);
          done();
        });
    });
  });
});
