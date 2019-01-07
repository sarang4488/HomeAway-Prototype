var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle login request:" + JSON.stringify(msg.name));

  mongoose.Properties.find(
    {
      name: msg.name
    },

    function(err, property) {
      if (err) {
        res.code = "400";
        res.value =
          "No properties  match our records. Please double-check and try again.";
        console.log(res.value);
        console.log(err);
        res.sendStatus(400).end();
      } else {
        console.log(property);

        res.code = "200";
        res.value = property;
        console.log("response", res);
        callback(null, res);
      }
    }
  );
}

exports.handle_request = handle_request;
