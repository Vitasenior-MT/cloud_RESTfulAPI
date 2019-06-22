var db = require('../../models/index');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.create({ type: attributes.type, name: attributes.name, tag: attributes.tag }).then(
            boardmodel => resolve(boardmodel),
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
        db.Boardmodel.update({ type: attributes.type, name: attributes.name, tag: attributes.tag }, { where: { id: board_model_id } }).then(
            boardmodel => resolve(boardmodel),
            error => reject(error));
    });
}

exports.remove = (board_model_id) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.destroy({ where: { id: board_model_id } }).then(
            () => resolve(boardmodel),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.setSensor = (board_model_id, sensor_model_id) => {
    return new Promise((resolve, reject) => {
        if (sensor_model_id)
            db.Boardmodel.findOne({ where: { id: board_model_id }, include: [{ model: db.Sensormodel }] }).then(
                boardmodel => {
                    if (boardmodel) {
                        let sensormodel = boardmodel.Sensormodels.find(x => x.id === sensor_model_id);
                        if (!sensormodel) boardmodel.addSensormodel(sensor_model_id).then(
                            () => db.Sensormodel.findOne({ where: { id: sensor_model_id } }).then(
                                sensormodel => resolve({ boardmodel: boardmodel.name, sensormodel: sensormodel }),
                                error => reject({ code: 500, msg: error.message })),
                            error => reject({ code: 500, msg: error.message }));
                        else reject({ code: 500, msg: "sensor model is already associated" });
                    } else reject({ code: 500, msg: "board model not found" });
                }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid sensor model id" });
    });
}

exports.getSensors = (board_model_id) => {
    return new Promise((resolve, reject) => {
        db.Boardmodel.findOne({
            where: { id: board_model_id },
            include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
        }).then(
            model => {
                model.Sensormodels.forEach(element => delete element.dataValues.BoardmodelSensor);
                resolve(model.Sensormodels);
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.removeSensor = (board_model_id, sensor_model_id) => {
    return new Promise((resolve, reject) => {
        if (sensor_model_id) db.Boardmodel.findOne({ where: { id: board_model_id }, include: [{ model: db.Sensormodel }] }).then(
            boardmodel => {
                if (boardmodel) {
                    let sensormodel = boardmodel.Sensormodels.find(x => x.id == sensor_model_id);
                    if (sensormodel) boardmodel.removeSensormodel(sensor_model_id).then(
                        () => resolve({ boardmodel: boardmodel.name, sensormodel: sensormodel }),
                        error => reject({ code: 500, msg: error.message }));
                } else reject({ code: 500, msg: "board model not found" });
            }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid sensor id" });
    });
}
