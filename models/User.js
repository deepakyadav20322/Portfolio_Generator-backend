const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: String,
  email: String,
  profilePhoto: String,
  hasPortfolio:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model('User', UserSchema);
