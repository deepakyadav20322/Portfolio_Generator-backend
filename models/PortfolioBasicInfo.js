const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  portfolioURL: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  title: { type: String, required: true },
  tagline: { type: String },
  description: { type: String, required: true },
  email: { type: String, required: true },
  skills: { type: [String] },
  phone: { type: String },
  linkedin: { type: String },
  github: { type: String },
  youtube: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // route:{type: mongoose.Schema.Types.ObjectId, ref: 'Route'}
});

module.exports = mongoose.model('PortfolioBasicInfo', portfolioSchema);
