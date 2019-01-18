var express = require("express");
var router = express.Router();
var passport = require('../libs/passport');

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", passport.authenticate("local", {  successRedirect: "/users",
                                                        failureRedirect: "/" })
);

module.exports = router;
