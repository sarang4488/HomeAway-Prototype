var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In list property handle request:" + JSON.stringify(msg));

  var booking = new mongoose.Booking({
    customername: msg.customername,
    propertyname: msg.propertyname,
    checkin: msg.checkin,
    checkout: msg.checkout,
    guests: msg.guests,
    price: msg.price,
    description: msg.description
  });
  booking.save().then(
    booking => {
      console.log("Booking done successfully :", booking);
      res.code = 200;
      res.value = booking;
      callback(null, res);
    },
    err => {
      console.log("Error creating user");
      res.sendStatus(400).end();
    }
  );
}

exports.handle_request = handle_request;
