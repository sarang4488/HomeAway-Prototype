var mongoose = require("./mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle passwordupdate request:" + JSON.stringify(msg));
  mongoose.Users.findOne({ email: msg.email }, function(err, user) {
    if (err) {
      console.log("Error");
      callback(err, null);
    } else {
      if (!user) {
        console.log("User not found");
        res.code = "404";
        res.value = "User does not exist";
        callback(null, res);
      } else {
        bcrypt.compare(msg.currentPassword, user.password, function(
          err,
          result
        ) {
          if (!result) {
            console.log("Password Error");
            res.code = "401";
            res.value = "Password does not match!";
            callback(null, res);
          } else if (result) {
            bcrypt.hash(msg.confirmPassword, saltRounds, function(err, hash) {
              var password = hash;
              mongoose.Users.findOneAndUpdate(
                {
                  email: msg.email
                },
                {
                  $set: { password: password }
                },
                function(err, user) {
                  console.log(err);
                  console.log(user);
                  if (err) {
                    res.code = "400";
                    res.value = "Error 400.";
                    console.log(res.value);
                    res.sendStatus(400).end();
                    callback(null, res);
                  } else {
                    res.code = 200;
                    res.value = user;
                    callback(null, res);
                  }
                }
              );
            });
          }
        });
      }
    }
  });
}

exports.handle_request = handle_request;
