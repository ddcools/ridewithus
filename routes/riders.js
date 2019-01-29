const db = require("../models/index");
const express = require("express");
const riderValidator = require("../libs/validators/rider");
const router = express.Router();

router.get("/", function(req, res, next) {
  res.send("Success");
});

router.post("/", function(req, res, next) {
  console.log(req.body);
  var validationResult = riderValidator.validateRiderDetails(req.body);
  if (validationResult.error === null) {
    db.Rider.create({
      name: req.body.name,
      age: req.body.age,
      profession: req.body.profession
    })
      .then(user => {
        db.Bike.create({
          name: req.body.bike.name,
          riderId: user.uuid,
          brand: req.body.bike.brand,
          yom: req.body.bike.yom
        })
          .then(bike => {
            res.json({ user: user, bike: bike });
          })
          .catch(error => {
            res.json({ error: error });
          });
      })
      .catch(error => {
        res.json({ error: error });
      });
  } else {
    res.json({ error: validationResult.error.message });
  }
});

module.exports = router;