const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  stack: String,
  level: Number
});

const offerSchema = new mongoose.Schema({
  logo: String,
  company: String,
  website: String,
  companySize: Number,
  companyType: String,
  industry: String,
  position: String,
  experience: String,
  contract: String,
  salary: [Number],
  currency: String,
  description: String,
  city: String,
  street: String,
  lonLat: [Number],
  applyDestination: String,
  mainTech: String,
  timePosted: Date,
  tags: [tagSchema],
});

module.exports = mongoose.model('offer', offerSchema, 'offers');
