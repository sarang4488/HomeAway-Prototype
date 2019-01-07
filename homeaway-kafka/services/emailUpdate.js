var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In check handle update -----request:" + JSON.stringify(msg));
  mongoose.Users.findOneAndUpdate(
    {
      email: msg.currentEmail
    },
    {
      $set: { email: msg.email }
    },
    function(err, user) {
      if (err) {
        res.code = "400";
        res.value = "Error 400.";
        console.log("inside error");
        res.sendStatus(400).end();
        callback(null, res);
      } else {
        console.log("inside update");
        res.code = 200;
        res.value = user;
        console.log(res);
        callback(null, res);
      }
    }
  );
}

exports.handle_request = handle_request;
