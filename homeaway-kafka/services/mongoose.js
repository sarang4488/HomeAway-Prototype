var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
var url = `mongodb://sarang4488:partner123@ds145573.mlab.com:45573/homeaway`;
const options = {
  poolSize: 1000
};
mongoose.connect(url);

module.exports.Users = mongoose.model("Users", {
  name: {
    type: String,
    default: "Name"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  city: {
    type: String,
    default: "City"
  },
  country: {
    type: String,
    default: "Country"
  },
  company: {
    type: String,
    default: "Company"
  },
  school: {
    type: String,
    default: "School"
  },
  hometown: {
    type: String,
    default: "Hometown"
  },
  languages: {
    type: String,
    default: "Languages"
  },
  gender: {
    type: String,
    default: "Gender"
  },
  about: {
    type: String,
    default: "About"
  }
});

module.exports.Properties = mongoose.model("Property", {
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

module.exports.Booking = mongoose.model("Booking", {
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

module.exports.Inbox = mongoose.model("Inbox", {
  customername: {
    type: String
  },
  propertyname: {
    type: String
  },

  ownername: {
    type: String
  },
  messageCustomer: {
    type: String
  },
  messageOwner: {
    type: String
  }
});
