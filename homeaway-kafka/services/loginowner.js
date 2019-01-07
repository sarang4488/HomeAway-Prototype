var mongoose = require("./mongoose");
//var passwordHash = require('password-hash');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var config = require("../services/settings");
var passport = require("passport");
const saltRounds = 10;
function handle_request(msg, callback) {
  var res = {};
  console.log("In handle login owner request:" + JSON.stringify(msg));
  console.log("In handle login request:" + msg.password);

  mongoose.Users.findOne({ email: msg.email, type: "owner" }, function(
    err,
    user
  ) {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        console.log("Not a valid user");
        res.code = "404";
        res.value = "user does not exist";
        callback(null, res);
        //done(null,false,{ message: 'user does not exist' });
      } else {
        bcrypt.compare(msg.password, user.password, function(err, result) {
          console.log("inside ", err, result);
          if (!result) {
            console.log("Passwords do not match");
            res.code = "401";
            res.value =
              "The email and password you entered did not match our records. Please double-check and try again.";
            callback(null, res);
          } else if (result) {
            res.code = "200";
            res.value = user;
            console.log("Successful login");
            callback(null, res);
          }
        });
      }
    }
    //callback(null, res);
  });
}

exports.handle_request = handle_request;
