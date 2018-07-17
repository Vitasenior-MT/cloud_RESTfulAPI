var db = require('../../models/index'),
  boardmodel = require('./board_model');


exports.create = (board_id, board_model_id) => {
  return new Promise((resolve, reject) => {
    boardmodel.getSensors(board_model_id).then(
      models => {
        let promises = models.map(element => { return _createSingleSensor(board_id, element.id) });
        Promise.all(promises).then(
          sensors => resolve(),
          error => reject({ code: 500, msg: "cannot create the sensors" }));
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.find = (sensor_id) => {
  return new Promise((resolve, reject) => {
    db.Sensor.findById(sensor_id, { include: [{ model: db.Board, include: [{ model: db.Vitabox }, { model: db.Patient }] }] }).then(
      sensor => {
        if (sensor) resolve(sensor);
        else reject({ code: 500, msg: "Sensor not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

// ________________________________________________________________________
// Private
// ________________________________________________________________________
_createSingleSensor = (board_id, model_id) => {
  return new Promise((resolve, reject) => {
    db.Sensor.create({ board_id: board_id, sensormodel_id: model_id }).then(
      () => resolve(),
      error => reject({ code: 500, msg: error.message }));
  })
}