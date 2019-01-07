var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  //console.log("In handle login request:" + JSON.stringify(msg));

  mongoose.Users.findOneAndUpdate(
    {
      email: msg.email
    },
    {
      $set: {
        type: "owner"
      }
    },
    function(err, result) {
      if (err) {
        res.code = "400";
        res.value =
          "No properties  match our records. Please double-check and try again.";
        console.log(res.value);
        console.log(err);
        res.sendStatus(400).end();
      } else {
        console.log(result);
        res.code = 200;
        res.value = result;
        console.log("Successfully converted traveller to owner");
        callback(null, res);
      }
    }
  );
}

exports.handle_request = handle_request;
