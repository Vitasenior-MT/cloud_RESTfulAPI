var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    patient_id: {
        type: String,
        required: false
    },
    board_id: {
        type: String,
        required: false
    },
    sensor_id: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
}, { versionKey: false });

module.exports = mongoose.model('Record', schema);