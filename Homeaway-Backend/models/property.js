var mongoose = require("mongoose");

var Properties = mongoose.model("Property", {
  ownername: {
    type: String
  },
  name: {
    type: String
  },
  propertydescription: {
    type: String
  },
  location: {
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
  type: {
    type: String
  },
  bedrooms: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  amenities: {
    type: String
  },

  description: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = { Properties };
