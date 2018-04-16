var db = require('../../models/index');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.create({ type: attributes.type, name: attributes.name }).then(
            model => resolve(model),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findAll({ attributes: ['id', 'type', 'name'] }).then(
            models => resolve(models),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.update = (board_model_id, attributes) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.update({ type: attributes.type, name: attributes.name }).then(
                    () => resolve(),
                    error => reject(error));
                else reject({ code: 500, msg: "board model not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.remove = (board_model_id) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.destroy().then(
                    () => resolve(),
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "board model not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.setSensor = (board_model_id, sensor_id) => {
    return new Promise((resolve, reject) => {
        if (sensor_id)
            db.Boardmodel.findById(board_model_id).then(
                model => {
                    if (model) model.hasSensor(sensor_id).then(
                        success => {
                            if (!success) model.addSensor(sensor_id).then(
                                () => resolve(),
                                error => reject({ code: 500, msg: error.message }));
                            else reject({ code: 500, msg: "sensor is already associated" });
                        }, error => reject({ code: 500, msg: error.message }));
                    else reject({ code: 500, msg: "board model not found" });
                }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid sensor id" });
    });
}

exports.getSensors = (board_model_id) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.getSensors({ attributes: { exclude: ['created_at', 'updated_at'] } }).then(
                    sensors => {
                        sensors.forEach(element => delete element.dataValues.BoardSensor);
                        resolve(sensors)
                    },
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "board model not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.removeSensor = (board_model_id, sensor_id) => {
    return new Promise((resolve, reject) => {
        if (sensor_id)
            db.Boardmodel.findById(board_model_id).then(
                model => {
                    if (model) model.removeSensors(sensor_id).then(
                        () => resolve(),
                        error => reject({ code: 500, msg: error.message }));
                    else reject({ code: 500, msg: "board model not found" });
                }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid sensor id" });
    });
}