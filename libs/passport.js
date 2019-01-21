var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models/index");

passport.use(
  new LocalStrategy(function(username, password, done) {
    db.User.findOne({ firstName: username })
      .then(function(user) {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        else if (user.password != password) {
          return done(null, false, { message: "Incorrect password." });
        }
        done(null, user);
      })
      .catch(function(err) {
        done(err);
      });
  })
);

passport.serializeUser( function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(function(error) {
      console.log(`Error: ${error}`);
    });
});

module.exports = passport;