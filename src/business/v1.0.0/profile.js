var db = require('../../models/index');

exports.create = (patient_id, sensormodel) => {
  return new Promise((resolve, reject) => {
    if (sensormodel.tag && sensormodel.min_acceptable && sensormodel.max_acceptable && sensormodel.measure && patient_id) {
      db.Profile.findOrCreate({ where: { patient_id: patient_id, tag: sensormodel.tag }, defaults: { min: sensormodel.min_acceptable, max: sensormodel.max_acceptable, measure: sensormodel.measure } }).then(
        profile => resolve(profile),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "undefined fields, verify max and min values, measure and patient" });
  });
}

exports.update = (patient_id, profiles) => {
  return new Promise((resolve, reject) => {
    let promises = profiles.map(x => {
      if (x.min && x.max)
        return db.Profile.update({ min: x.min, max: x.max }, { where: { id: x.id, patient_id: patient_id } });
      else return null;
    });
    Promise.all(promises.filter(x => x)).then(
      () => resolve(),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.removeByTag = (patient_id, tag) => {
  return new Promise((resolve, reject) => {
    if (patient_id && tag) {
      db.Profile.destroy({ where: { patient_id: patient_id, tag: tag } }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "patient or profile undefined" });
  });
}

exports.removeByIds = (ids) => {
  return new Promise((resolve, reject) => {
    db.Profile.destroy({ where: { id: { $or: ids } } }).then(
      () => resolve(),
      error => reject({ code: 500, msg: error.message }));
  });
}