const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const offerSchema = new Schema({
  position: String,
  company: String,
  location: String,
  remote: Boolean,
  salary: [Number],
  currency: String,
  tags: [String],
  timePosted: Date,
});

module.exports = mongoose.model("offer", offerSchema, "offers");
