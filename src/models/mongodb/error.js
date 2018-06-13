var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
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
  },
  object_id: {
    type: Number,
    required: true
  },
  seen_date: {
    type: Date,
    default: null
  },
  seen_user: {
    type: String,
    default: null
  },
}, {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      }
    }
  });


module.exports = mongoose.model('Error', schema);