"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var config = require("./settings");
var db = require("../models/user");

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
  };
  console.log("opts value is", opts);
  //clconsole.log("jwtpayload value is ", jwt_payload);
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      console.log("emain in jwt is:", jwt_payload.email);
      db.Users.find({ email: jwt_payload.email }, function(error, result) {
        if (error) {
          return callback(error, false);
        } else if (result) {
          var user = result;
          delete user.password;
          callback(null, user);
        }
      });
    })
  );
};
