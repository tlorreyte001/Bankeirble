const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    gender: String,
    lastName: String,
    givenName : String,
    firstName: String,
    birthDate: Date,
    birthPlace: String,
    address: {
      addressNumber: Number,
      street: String,
      postcode: Number,
      city: String,
      other: String
    },
    email: String,
    pseudo: String,
    password: String
    },
);

module.exports = mongoose.model("Users", userSchema);
