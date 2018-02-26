var db = require('../../models/db');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Sensor.create({ transducer: attributes.transducer, measure: attributes.measure, min_acceptable: attributes.min_acceptable, max_acceptable: attributes.max_acceptable, min_possible: attributes.min_possible, max_possible: attributes.max_possible }).then(
            sensor => resolve(sensor),
            error => reject(error));
    });
}

exports.list = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Sensor.findAll({ attributes: { exclude: ['created_at', 'updated_at'] } }).then(
            sensors => resolve(sensors),
            error => reject(error));
    });
}

exports.update = (sensor_id, attributes) => {
    return new Promise((resolve, reject) => {
        db.Sensor.findById(sensor_id).then(
            sensor => {
                if (sensor) sensor.update({ transducer: attributes.transducer, measure: attributes.measure, min_acceptable: attributes.min_acceptable, max_acceptable: attributes.max_acceptable, min_possible: attributes.min_possible, max_possible: attributes.max_possible }).then(
                    () => resolve(),
                    error => reject(error));
                else reject(new Error("sensor not found"));
            }, error => reject(error));
    });
}

exports.remove = (sensor_id) => {
    return new Promise((resolve, reject) => {
        db.Sensor.findById(sensor_id).then(
            sensor => {
                if (sensor) sensor.destroy().then(
                    () => resolve(),
                    error => reject(error));
                else reject(new Error("sensor not found"));
            }, error => reject(error));
    });
}