var express = require("express");
var router = express.Router();
var db = require("../models/index");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
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
