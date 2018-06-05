var db = require('../../models/index');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.create({ type: attributes.type, name: attributes.name, tag: attributes.tag }).then(
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

exports.setSensor = (board_model_id, sensor_model_id) => {
    return new Promise((resolve, reject) => {
        if (sensor_model_id)
            db.Boardmodel.findById(board_model_id).then(
                model => {
                    if (model) model.hasSensormodel(sensor_model_id).then(
                        success => {
                            if (!success) model.addSensormodel(sensor_model_id).then(
                                () => resolve(),
                                error => reject({ code: 500, msg: error.message }));
                            else reject({ code: 500, msg: "sensor model is already associated" });
                        }, error => reject({ code: 500, msg: error.message }));
                    else reject({ code: 500, msg: "board model not found" });
                }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid sensor model id" });
    });
}

exports.getSensors = (board_model_id) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.getSensormodels({ attributes: { exclude: ['created_at', 'updated_at'] } }).then(
                    models => {
                        models.forEach(element => delete element.dataValues.BoardmodelSensor);
                        resolve(models)
                    },
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "board model not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.removeSensor = (board_model_id, sensor_model_id) => {
    return new Promise((resolve, reject) => {
        if (sensor_model_id) db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.removeSensormodel(sensor_model_id).then(
                    () => resolve(),
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "board model not found" });
            }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid sensor id" });
    });
}