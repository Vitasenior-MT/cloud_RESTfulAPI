var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: false
  },
  vitabox_id: {
    type: String,
    required: true
  },
  is_board: {
    type: Boolean,
    required: true,
    default: false
  },
  is_patient: {
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
  }
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

module.exports = mongoose.model('Warning', schema);