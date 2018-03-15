var db = require('../../models/index');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Sensor.create({ transducer: attributes.transducer, measure: attributes.measure, min_acceptable: attributes.min_acceptable, max_acceptable: attributes.max_acceptable, min_possible: attributes.min_possible, max_possible: attributes.max_possible }).then(
            sensor => resolve(sensor),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.list = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Sensor.findAll({ attributes: { exclude: ['created_at', 'updated_at'] } }).then(
            sensors => resolve(sensors),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.update = (sensor_id, attributes) => {
    return new Promise((resolve, reject) => {
        db.Sensor.findById(sensor_id).then(
            sensor => {
                if (sensor) sensor.update({ transducer: attributes.transducer, measure: attributes.measure, min_acceptable: attributes.min_acceptable, max_acceptable: attributes.max_acceptable, min_possible: attributes.min_possible, max_possible: attributes.max_possible }).then(
                    () => resolve(),
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "sensor not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.remove = (sensor_id) => {
    return new Promise((resolve, reject) => {
        db.Sensor.findById(sensor_id).then(
            sensor => {
                if (sensor) sensor.destroy().then(
                    () => resolve(),
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "sensor not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}