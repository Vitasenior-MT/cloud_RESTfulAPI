var db = require('../../models/index');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.create({ type: attributes.type, name: attributes.name }).then(
            model => resolve(model),
            error => reject(error));
    });
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findAll({ attributes: ['id', 'type', 'name'] }).then(
            models => resolve(models),
            error => reject(error));
    });
}

exports.update = (board_model_id, attributes) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.update({ type: attributes.type, name: attributes.name }).then(
                    () => resolve(),
                    error => reject(error));
                else reject(new Error("board model not found"));
            }, error => reject(error));
    });
}

exports.remove = (board_model_id) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.destroy().then(
                    () => resolve(),
                    error => reject(error));
                else reject(new Error("board model not found"));
            }, error => reject(error));
    });
}

exports.setSensors = (board_model_id, sensors) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.addSensors(sensors).then(
                    () => resolve(),
                    error => reject(error));
                else reject(new Error("board model not found"));
            }, error => reject(error));
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
                    error => reject(error));
                else reject(new Error("board model not found"));
            }, error => reject(error));
    });
}

exports.removeSensor = (board_model_id, sensor_id) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.removeSensors(sensor_id).then(
                    () => resolve(),
                    error => reject(error));
                else reject(new Error("board model not found"));
            }, error => reject(error));
    });
}