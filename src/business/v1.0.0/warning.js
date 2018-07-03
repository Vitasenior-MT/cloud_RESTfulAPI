var db = require('../../models/index'),
  utils = require('./utils');

exports.getByVitabox = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.find().where({ vitabox_id: vitabox_id }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      let promises = res.map(warning => {
        if (warning.patient_id === null) return _getSensorWarningInfo(warning);
        else return _getPatientWarningInfo(warning);
      });
      Promise.all(promises).then(
        data => resolve(data.filter(x => x)),
        err => reject({ code: 500, msg: "Could not extract info from warnings" }));
    });
  })
}

exports.getByPatient = (patient_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.find().where({ patient_id: patient_id }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      Promise.all(res.map(x => _getPatientWarningInfo(x))).then(
        data => resolve(data.filter(x => x)),
        err => reject({ code: 500, msg: "Could not extract info from warnings" }));
    });
  })
}

exports.getFromVitabox = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.find().where({ vitabox_id: vitabox_id, seen_vitabox: null, patient_id: { $ne: null } }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      Promise.all(res.map(x => _getPatientWarningInfo(x))).then(
        data => resolve(data.filter(x => x)),
        err => reject({ code: 500, msg: "Could not extract info from warnings" }));
    });
  })
}

exports.setCheckByUser = (warning_id, user_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.find().where({ _id: warning_id }).exec((err, warning) => {
      if (err) reject({ code: 500, msg: err.message });
      if (warning.seen_user !== null) {
        warning.seen_user = user_id;
        warning.seen_date = new Date();
        warning.save().then(
          () => resolve(),
          err => reject({ code: 500, msg: err.message }));
      } else resolve();
    });
  })
}

exports.setCheckByVitabox = (warning_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.find().where({ _id: warning_id }).exec((err, warning) => {
      if (err) reject({ code: 500, msg: err.message });
      if (warning.seen_user !== null) {
        warning.seen_vitabox = new Date();
        warning.save().then(
          () => resolve(),
          err => reject({ code: 500, msg: err.message }));
      } else resolve();
    });
  })
}


_getSensorWarningInfo = (warning) => {
  return new Promise((resolve, reject) => {
    let promises = [db.Sensor.findById(warning.sensor_id, { include: [{ model: db.Sensormodel }, { model: db.Board }] })];
    if (warning.seen_user) promises.push(db.User.findById(warning.seen_user));
    Promise.all(promises).then(
      res => resolve({
        "id": warning._id,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "patient_id": warning.patient_id,
        "seen_date": warning.seen_date,
        "seen_user": warning.seen_user ? utils.decrypt(res[1].name) : null,
        "seen_vitabox": warning.seen_vitabox,
        "what": res[0].Sensormodel.tag,
        "who": res[0].Board.description
      }),
      err => reject(err));
  });
}

_getPatientWarningInfo = (warning) => {
  return new Promise((resolve, reject) => {
    let promises = [
      db.Sensor.findById(warning.sensor_id, { include: [{ model: db.Sensormodel }] }),
      db.Patient.findById(warning.patient_id)
    ];
    if (warning.seen_user) promises.push(db.User.findById(warning.seen_user))
    Promise.all(promises).then(
      res => resolve({
        "id": warning._id,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "patient_id": warning.patient_id,
        "seen_date": warning.seen_date,
        "seen_user": warning.seen_user ? utils.decrypt(res[2].name) : null,
        "seen_vitabox": warning.seen_vitabox,
        "what": res[0].Sensormodel.tag,
        "who": utils.decrypt(res[1].name)
      }),
      err => reject(err));
  });
}