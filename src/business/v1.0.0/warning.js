var db = require('../../models/index'),
  utils = require('./utils');

exports.getFromUserToEnvironment = (page, user) => {
  return new Promise((resolve, reject) => {
    if (page > 0) {
      user.getVitaboxes().then(vitaboxes =>
        db.Warning.find().where({ vitabox_id: { $in: vitaboxes.map(x => x.id) } }).where({ patient_id: { $eq: null } }).sort('-datetime').skip((page - 1) * 24).limit(24).exec((err, res) => {
          if (err) reject(err);
          if (res) Promise.all(res.map(warning => _getEnvironmentWarningInfo(warning, vitaboxes.find(x => x.id == warning.vitabox_id).address))).then(
            data => resolve(data.filter(x => x)),
            err => reject({ code: 500, msg: err.message }));
          else resolve([]);
        }), err => reject({ code: 500, msg: err.message }));
    } else reject({ code: 500, msg: "invalid page" });
  })
}

exports.getFromUserToPatient = (page, user) => {
  return new Promise((resolve, reject) => {
    if (page > 0) {
      user.getVitaboxes().then(vitaboxes =>
        db.Warning.find().where({ vitabox_id: { $in: vitaboxes.map(x => x.id) } }).where({ patient_id: { $ne: null } }).sort('-datetime').skip((page - 1) * 24).limit(24).exec((err, res) => {
          if (err) reject(err);
          if (res) Promise.all(res.map(warning => _getPatientWarningInfo(warning))).then(
            data => resolve(data.filter(x => x)),
            err => reject({ code: 500, msg: err.message }));
          else resolve([]);
        }), err => reject({ code: 500, msg: err.message }));
    } else reject({ code: 500, msg: "invalid page" });
  })
}

exports.getFromDoctor = (page, user) => {
  return new Promise((resolve, reject) => {
    if (page > 0) {
      user.getPatients().then(
        patients => {
          db.Warning.find().where({ patient_id: { $in: patients.map(x => x.id) } }).sort('-datetime').skip((page - 1) * 24).limit(24).exec((err, res) => {
            if (err) reject({ code: 500, msg: err.message });
            if (res) Promise.all(res.map(warning => _getPatientWarningInfoToDoctor(warning, patients.find(x => x.id === warning.patient_id)))).then(
              data => resolve(data.filter(x => x)),
              err => reject({ code: 500, msg: err.message }));
            else resolve([]);
          }, error => reject({ code: 500, msg: "Could not extract warnings" }));
        }, err => reject({ code: 500, msg: err.message }));
    } else reject({ code: 500, msg: "invalid page" });
  });
}

exports.getFromVitabox = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.find().where({ vitabox_id: vitabox_id }).where({ seen_vitabox: { $eq: null } }).where({ patient_id: { $ne: null } }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      Promise.all(res.map(x => _getPatientWarningInfo(x))).then(
        data => resolve(data.filter(x => x)),
        err => reject({ code: 500, msg: "Could not extract info from warnings" }));
    });
  })
}

exports.checkWarningByUser = (user) => {
  return new Promise((resolve, reject) => {
    db.WarningUser.updateMany({ user_id: user.id }, { $set: { "seen_date": new Date(), "count": 0 } }, { multi: true }, (err, res) => {
      if (err) reject(err);
      if (user.doctor) db.WarningDoctor.updateMany({ user_id: user.id }, { $set: { "seen_date": new Date(), "count": 0 } }, (err, res) => {
        if (err) reject({ code: 500, msg: err.message });
        resolve();
      });
      else resolve();
    });
  })
}

exports.checkWarningByVitabox = (id, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.updateMany({ _id: id, vitabox_id: vitabox_id }, { $set: { "seen_vitabox": new Date() } }, (err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  })
}

exports.setWarningCount = (user_id, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.WarningUser.create({ "vitabox_id": vitabox_id, "user_id": user_id }, (err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  })
}

exports.setWarningDoctor = (user_id, patient_id) => {
  return new Promise((resolve, reject) => {
    db.WarningDoctor.create({ "patient_id": patient_id, "user_id": user_id }, (err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  })
}

exports.getWarningCount = (user_id) => {
  return new Promise((resolve, reject) => {
    let promise1 = new Promise((resolve, reject) => {
      db.WarningUser.find().where({ "user_id": user_id }).exec((err, res) => {
        if (err) reject();
        else if (res.length > 0) resolve(res.map(x => x.count).reduce((a, v) => a + v));
        else resolve(0);
      });
    });
    let promise2 = new Promise((resolve, reject) => {
      db.WarningDoctor.find().where({ "user_id": user_id }).exec((err, res) => {
        if (err) reject();
        else if (res.length > 0) resolve(res.map(x => x.count).reduce((a, v) => a + v));
        else resolve(0);
      });
    });
    Promise.all([promise1, promise2]).then(
      res => resolve(res.reduce((a, v) => a + v)),
      err => reject({ code: 500, msg: "Could not extract warnings count" }));
  })
}

exports.removeWarningCount = (user_id, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.WarningUser.remove({ "vitabox_id": vitabox_id, "user_id": user_id }).exec(err => {
      if (err) reject(err);
      else resolve();
    });
  })
}

exports.removeWarningDoctor = (user_id, patient_id) => {
  return new Promise((resolve, reject) => {
    db.WarningDoctor.remove({ "patient_id": patient_id, "user_id": user_id }).exec(err => {
      if (err) reject(err);
      else resolve();
    });
  })
}

//_____________ PRIVATE _________________
//_______________________________________

_getEnvironmentWarningInfo = (warning, vitabox_address) => {
  return new Promise((resolve, reject) => {
    db.Sensor.findOne({
      where: { id: warning.sensor_id },
      include: [{ model: db.Sensormodel }, { model: db.Board, include: [{ model: db.Boardmodel }] }]
    }).then(
      res => resolve({
        "id": warning._id,
        "datetime": warning.datetime,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "seen_vitabox": warning.seen_vitabox,
        "what": res.Sensormodel.to_read,
        "who": res.Board.description ? utils.decrypt(res.Board.description) : res.Board.Boardmodel.name,
        "entity": utils.decrypt(vitabox_address),
        "tag": res.Sensormodel.tag
      }),
      err => reject(err));
  });
}

_getPatientWarningInfo = (warning) => {
  return new Promise((resolve, reject) => {
    let promises = [
      db.Sensor.findOne({
        where: { id: warning.sensor_id },
        include: [{ model: db.Sensormodel }, { model: db.Board, include: [{ model: db.Boardmodel }] }]
      }),
      db.Patient.findOne({
        where: { id: warning.patient_id }
      })
    ];
    Promise.all(promises).then(
      res => resolve({
        "id": warning._id,
        "datetime": warning.datetime,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "patient_id": warning.patient_id,
        "seen_vitabox": warning.seen_vitabox,
        "what": res[0].Sensormodel.to_read,
        "who": utils.decrypt(res[1].name),
        "entity": utils.decrypt(res[1].name),
        "tag": res[0].Board.Boardmodel.tag
      }),
      err => reject(err));
  });
}

_getPatientWarningInfoToDoctor = (warning, patient) => {
  return new Promise((resolve, reject) => {
    db.Sensor.findOne({
      where: { id: warning.sensor_id },
      include: [{ model: db.Sensormodel }, { model: db.Board, include: [{ model: db.Boardmodel }] }]
    }).then(
      res => resolve({
        "id": warning._id,
        "datetime": warning.datetime,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "patient_id": patient.id,
        "seen_vitabox": warning.seen_vitabox,
        "what": res.Sensormodel.to_read,
        "who": utils.decrypt(patient.name),
        "entity": utils.decrypt(patient.name),
        "tag": res.Board.Boardmodel.tag
      }),
      err => reject(err));
  });
}