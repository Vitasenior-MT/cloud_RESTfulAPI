var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  datetime: {
    type: Date,
    required: true,
    default: Date.now()
  },
  message: {
    type: String,
    required: false
  }
}, { versionKey: false });

module.exports = mongoose.model('Log', schema);