var mongoose = require("./mongoose");
var bcrypt = require("bcrypt");
const saltRounds = 10;

function handle_request(msg, callback) {
  var res = {};
  console.log("In register owner handle request:" + JSON.stringify(msg));
  bcrypt.hash(msg.password, saltRounds, function(err, hash) {
    var type = "owner";
    var email = msg.email;
    var password = hash;
    // const selectQueryString = “select * from user_signup where email = ?“;
    const userName = msg.fName + " " + msg.lName;
    var user = new mongoose.Users({
      name: userName,
      email: email,
      password: password,
      type: type
    });
    user.save().then(
      user => {
        console.log("User created :", user);
        res.code = 200;
        res.value = user;
        callback(null, res);
      },
      err => {
        console.log("Error creating user");
        res.code = 404;
        res.value = err;
        callback(null, res);
      }
    );
  });
}

exports.handle_request = handle_request;
