var db = require('../../config/db');

exports.create = function (attributes) {
    return new Promise((resolve, reject) => {
        var record = new db.Record({
            value: attributes.value,
            datetime: attributes.datetime,
            patient_id: attributes.patient_id,
            board_id: attributes.board_id,
            sensor_id: attributes.sensor_id
        });
        record.save((error, doc) => {
            if (error) reject(error);
            else resolve(doc);
        });
    });
}

exports.list = function () {
    return new Promise((resolve, reject) => {
        db.Record.find((error, doc) => {
            if (error) reject(error);
            else resolve(doc);
        });
    });

}