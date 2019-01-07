var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle owner dashboard request:" + JSON.stringify(msg));

  mongoose.Properties.find(
    {
      ownername: msg.ownername
    },
    function(err, prop, info) {
      if (err) {
        console.log(err);
      } else {
        if (!prop) {
          console.log("not valid user");
          res.code = "404";
          res.value = "property does not exist";
          //done(null,false,{ message: 'user does not exist' });
        } else {
          res.code = "200";
          res.value = prop;
          console.log("response", res);
          callback(null, res);
        }
      }
      //callback(null, res);
    }
  );
}

exports.handle_request = handle_request;
