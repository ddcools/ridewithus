var express = require("express");
var router = express.Router();
var db = require("../models/index");
var bcrypt = require("bcrypt");

router.get("/", function(req, res, next) {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log("user not yet logger in");
  }
  res.send("respond with a resource");
});

router.post("/register", function(req, res) {
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("firstname", "Firstname is required").notEmpty();
  req.checkBody("lastname", "Lastname is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
    res.status(422).json({ errors: errors });
  } else {
    req.session.success = true;
    var salt = bcrypt.genSaltSync(10);
    var encryptedPassword = bcrypt.hashSync(req.body.email, salt);
    db.User.create({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      password: encryptedPassword
    })
      .then(function(user) {
        res.json({ user: user });
      })
      .catch(function(error) {
        res.status(500).json({ error: error });
      });
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
