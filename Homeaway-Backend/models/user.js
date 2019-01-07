var mongoose = require("mongoose");

var Users = mongoose.model("Users", {
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

module.exports = { Users };
