var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle owner inbox  request:" + JSON.stringify(msg));

  mongoose.Inbox.find(
    {
      customername: msg.customername
    },
    function(err, result, info) {
      if (err) {
        console.log(err);
      } else {
        if (!result) {
          console.log("not valid user");
          res.code = "404";
          res.value = "property does not exist";
          callback(null, res);
          //done(null,false,{ message: 'user does not exist' });
        } else {
          res.code = "200";
          res.value = result;
          console.log("response", res);
          callback(null, res);
        }
      }
      //callback(null, res);
    }
  );
}

exports.handle_request = handle_request;
