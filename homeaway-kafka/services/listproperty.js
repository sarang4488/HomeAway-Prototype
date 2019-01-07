var mongoose = require("./mongoose");

function handle_request(msg, callback) {
  var res = {};
  console.log("In list property handle request:" + JSON.stringify(msg));

  var property = new mongoose.Properties({
    ownername: msg.ownername,
    name: msg.name,
    propertydescription: msg.propertydescription,
    location: msg.location,
    checkin: msg.checkin,
    checkout: msg.checkout,
    guests: msg.guests,
    price: msg.price,
    type: msg.type,
    bedrooms: msg.bedrooms,
    bathrooms: msg.bathrooms,
    description: msg.description,
    amenities: msg.amenities,
    img: msg.description
  });
  property.save().then(
    property => {
      console.log("Property created created :", property);
      res.code = 200;
      res.value = property;
      callback(null, res);
    },
    err => {
      console.log("Error creating user");
      res.sendStatus(400).end();
    }
  );
}

exports.handle_request = handle_request;
