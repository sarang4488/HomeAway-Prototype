var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle user update request:" + JSON.stringify(msg));

  mongoose.Users.findOneAndUpdate(
    {
      email: msg.email
    },
    {
      $set: {
        name: msg.name,
        about: msg.about,
        city: msg.city,
        company: msg.company,
        school: msg.school,
        hometown: msg.hometown,
        languages: msg.languages,
        gender: msg.gender
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
        console.log("response", res);
        callback(null, res);
      }
    }
  );
}

exports.handle_request = handle_request;
