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
    analyzed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

module.exports = mongoose.model('RecordTemp', schema);