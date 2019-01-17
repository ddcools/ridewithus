var express = require("express");
var router = express.Router();

const sequelize = require("../config/db/sequelize_connection");

var models = require('../models');
User = models.User;

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("Entering root path");

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

    User.findOne().then( user =>{
      console.log(user.get('firstName'));
    });

  res.render("index", { title: "Express" });
});

module.exports = router;
