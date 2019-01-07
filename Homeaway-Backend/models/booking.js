var mongoose = require("mongoose");

var Booking = mongoose.model("Booking", {
  customername: {
    type: String
  },
  propertyname: {
    type: String
  },

  checkin: {
    type: Date
  },
  checkout: {
    type: Date
  },
  guests: {
    type: Number
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
});

module.exports = { Booking };
