var mongoose = require('mongoose');
var schema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true,
    default: Date.now()
  },
  message: {
    type: String,
    required: false
  },
  vitabox_id: {
    type: String,
    required: false
  },
  seen: {
    type: Boolean,
    required: true,
    default: false
  },
  reported: {
    type: Boolean,
    required: true,
    default: false
  }

}, { versionKey: false });

module.exports = mongoose.model('Warning', schema);