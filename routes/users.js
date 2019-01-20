var express = require("express");
var router = express.Router();
var db = require("../models/index");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function(req, res) {
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.status(422).json({ errors: errors });
  } else {
    req.session.success = true;
    res.redirect("/");
  }
});

router.get("/lookup", function(req, res, next) {
  var result = null;
  db.User.findOrCreate({ where: { firstName: req.query.name } }).spread(
    function(user, created) {
      res.json({ user: user, new_record: created });
    }
  );
});

router.get("/:id", function(req, res, next) {
  var resultToSendback = {};
  db.User.findById(parseInt(req.params.id))
    .then(function(user) {
      resultToSendback.firstName = user.get("firstName");
      res.send(resultToSendback);
    })
    .catch(function(error) {
      resultToSendback.error = error;
      res.send(resultToSendback);
    });
});

module.exports = router;
