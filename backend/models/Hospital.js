const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  city:String,
  location: String,
  rating: Number,
  price:Number,
  specialty: String
});

module.exports = mongoose.model("Hospital", hospitalSchema);