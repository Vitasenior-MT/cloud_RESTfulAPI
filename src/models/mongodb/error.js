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
  object_id: {
    type: Number,
    required: true
  },
  is_vitabox: {
    type: Boolean,
    required: true,
    default: false
  },
  is_board: {
    type: Boolean,
    required: true,
    default: false
  },
  is_sensor: {
    type: Boolean,
    required: true,
    default: false
  }
}, { versionKey: false });

module.exports = mongoose.model('Error', schema);