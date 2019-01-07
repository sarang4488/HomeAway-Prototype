var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("reached in  handle request of reply from owner message");
  console.log(msg);
  mongoose.Inbox.findOneAndUpdate(
    {
      ownername: msg.ownername,
      customername: msg.customername,
      propertyname: msg.propertyname
    },
    {
      messageOwner: msg.reply
    },
    { upsert: true, new: true }
  )
    .then(user => {
      if (!user) {
        console.log("Error in getting result");
        res.code = "201";
        res.value = "An error occured";
        callback(null, res);
      } else {
        console.log("Query successful");
        res.code = "200";
        res.value = user;
        console.log(res);
        callback(null, res);
      }
    })
    .catch(err => callback(err, "Error"));
}

exports.handle_request = handle_request;
