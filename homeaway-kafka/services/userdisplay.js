var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle user display request:" + JSON.stringify(msg));
  mongoose.Users.findOne(
    {
      email: msg.email
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value =
          "The email and password you entered did not match our records. Please double-check and try again.";
        console.log(res.value);
        res.sendStatus(400).end();
      } else console.log("user is", user);

      res.code = "200";
      res.value = user;
      console.log("response", res);
      callback(null, res);
    }
  );
}

exports.handle_request = handle_request;
