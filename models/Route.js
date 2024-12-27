const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

module.exports = mongoose.model("Route", RouteSchema);
