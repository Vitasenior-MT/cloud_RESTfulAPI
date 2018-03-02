var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now()
    },
    patient_id: {
        type: String,
        required: false
    },
    board_id: {
        type: String,
        required: true
    },
    sensor_id: {
        type: String,
        required: true
    },
}, { versionKey: false });

module.exports = mongoose.model('Record', schema);