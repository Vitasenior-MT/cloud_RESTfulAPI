var db = require('../../models/index');

exports.create = (attributes) => {
  return new Promise((resolve, reject) => {
    db.Sensormodel.create({
      transducer: attributes.transducer,
      measure: attributes.measure,
      min_acceptable: attributes.min_acceptable,
      max_acceptable: attributes.max_acceptable,
      min_possible: attributes.min_possible,
      max_possible: attributes.max_possible,
      min_graph: attributes.min_graph,
      max_graph: attributes.max_graph,
      tag: attributes.tag,
      unit: attributes.unit ? attributes.unit : "",
      to_read: attributes.to_read
    }).then(
      sensormodel => resolve(sensormodel),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Sensormodel.findAll({ attributes: { exclude: ['created_at', 'updated_at'] } }).then(
      models => resolve(models),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.update = (sensor_id, attributes) => {
  return new Promise((resolve, reject) => {
    db.Sensormodel.findOne({ where: { id: sensor_id } }).then(
      model => {
        if (model) model.update({
          transducer: attributes.transducer,
          measure: attributes.measure,
          min_acceptable: attributes.min_acceptable,
          max_acceptable: attributes.max_acceptable,
          min_possible: attributes.min_possible,
          max_possible: attributes.max_possible,
          min_graph: attributes.min_graph,
          max_graph: attributes.max_graph,
          tag: attributes.tag,
          unit: attributes.unit ? attributes.unit : "",
          to_read: attributes.to_read
        }).then(
          sensormodel => resolve(sensormodel),
          error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "sensor model not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.remove = (sensor_id) => {
  return new Promise((resolve, reject) => {
    db.Sensormodel.findOne({ where: { id: sensor_id } }).then(
      sensormodel => {
        if (sensormodel) sensormodel.destroy().then(
          () => resolve(sensormodel),
          error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "sensor model not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}