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
        db.Boardmodel.findAll({ attributes: ['id', 'type', 'name', 'tag'] }).then(
            models => resolve(models),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.update = (board_model_id, attributes) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findById(board_model_id).then(
            model => {
                if (model) model.update({ type: attributes.type, name: attributes.name, tag: attributes.tag }).then(
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
            db.Boardmodel.findOne({ where: { id: board_model_id }, include: [{ model: db.Board }, { model: db.Sensormodel }] }).then(
                boardmodel => {
                    if (boardmodel) if (!!boardmodel.Sensormodels.filter(x => x.id === sensor_model_id))
                        boardmodel.addSensormodel(sensor_model_id).then(
                            () => Promise.all(boardmodel.Boards.map(board => db.Sensor.create({ board_id: board.id, sensormodel_id: sensor_model_id }))).then(
                                () => resolve(),
                                error => reject({ code: 500, msg: "cannot create the sensors" })),
                            error => reject({ code: 500, msg: error.message }));
                    else reject({ code: 500, msg: "sensor model is already associated" });
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
        if (sensor_model_id) db.Boardmodel.findOne({ where: { id: board_model_id }, include: [{ model: db.Board }] }).then(
            boardmodel => {
                if (boardmodel) model.removeSensormodel(sensor_model_id).then(
                    () => Promise.all(boardmodel.Boards.map(board => {
                        return new Promise((resolve, reject) => db.Sensor.findOne({ where: { board_id: board.id, sensormodel_id: sensor_model_id } }).then(
                            sensor => sensor.destroy().then(
                                () => resolve(sensor.id),
                                error => reject(error)
                            ), error => reject(error)))
                    })).then(
                        ids => resolve(ids),
                        error => reject({ code: 500, msg: "cannot remove the sensors from boards" })),
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "board model not found" });
            }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid sensor id" });
    });
}
