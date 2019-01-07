var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle dashboard request:" + JSON.stringify(msg));

  mongoose.Booking.find(
    {
      customername: msg.customername
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
  ).sort({ checkout: -1 });
}

exports.handle_request = handle_request;
