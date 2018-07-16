var db = require('../../models/index'),
  utils = require('./utils');

exports.getFromUser = (page, user) => {
  return new Promise((resolve, reject) => {
    user.getVitaboxes().then(
      vitaboxes => {
        db.Warning.find().where({ vitabox_id: { $in: vitaboxes.map(x => x.id) } }).sort('-datetime').skip((page - 1) * 25).limit(25).exec((err, res) => {
          if (err) reject({ code: 500, msg: err.message });
          let promises = res.map(warning => {
            if (warning.patient_id === null) return _getSensorWarningInfo(warning);
            else return _getPatientWarningInfo(warning);
          });
          Promise.all(promises).then(
            data => resolve(data.filter(x => x)),
            err => reject({ code: 500, msg: "Could not extract warnings" }));
        });
      }, err => reject({ code: 500, msg: err.message }));
  })
}

exports.getFromDoctor = (page, user) => {
  return new Promise((resolve, reject) => {
    user.getPatients().then(
      patients => {
        db.Warning.find().where({ patient_id: { $in: patients.map(x => x.id) } }).sort('-datetime').skip((page - 1) * 25).limit(25).exec((err, res) => {
          if (err) reject({ code: 500, msg: err.message });
          let promises = res.map(warning => _getPatientWarningInfoToDoctor(warning, patients.map(x => x.id === warning.patient_id)));
          Promise.all(promises).then(
            data => resolve(data.filter(x => x)),
            err => reject({ code: 500, msg: err.message }));
        }, error => reject({ code: 500, msg: "Could not extract warnings" }));
      }, err => reject({ code: 500, msg: err.message }));
  });
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

exports.checkWarningByUser = (user) => {
  return new Promise((resolve, reject) => {
    db.WarningUnseen.where({ user_id: user.id }).update({
      "seen_date": new Date(),
      "count": 0
    }, (err, res) => {
      if (err) reject(err);
      resolve();
    });
  })
}

exports.checkWarningByVitabox = (id, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Warning.where({ _id: id, vitabox_id: vitabox_id }).update({ "seen_vitabox": new Date() }, (err, res) => {
      if (err) reject(err);
      resolve();
    });
  })
}

exports.setWarningCount = (user_id, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.WarningUnseen.create({
      "vitabox_id": vitabox_id,
      "user_id": user_id
    }, (err, res) => {
      if (err) reject(err);
      resolve();
    });
  })
}

exports.getWarningCount = (user_id) => {
  return new Promise((resolve, reject) => {
    db.WarningUnseen.find().where({ "user_id": user_id }).select("count").exec((err, res) => {
      if (err) reject(err);
      else if (res.length > 0) resolve(res.reduce((a, v) => a + v));
      else resolve(0);
    });
  })
}

exports.removeWarningCount = (user_id, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.WarningUnseen.remove({ "vitabox_id": vitabox_id, "user_id": user_id }).exec(err => {
      if (err) reject(err);
      else resolve();
    });
  })
}


_getSensorWarningInfo = (warning) => {
  return new Promise((resolve, reject) => {
    db.Sensor.findById(warning.sensor_id, { include: [{ model: db.Sensormodel }, { model: db.Board }] }).then(
      res => resolve({
        "id": warning._id,
        "datetime": warning.datetime,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "patient_id": null,
        "seen_vitabox": warning.seen_vitabox,
        "what": res.Sensormodel.to_read,
        "who": res.Board.description
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
    Promise.all(promises).then(
      res => resolve({
        "id": warning._id,
        "datetime": warning.datetime,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "patient_id": warning.patient_id,
        "seen_vitabox": warning.seen_vitabox,
        "what": res[0].Sensormodel.to_read,
        "who": utils.decrypt(res[1].name)
      }),
      err => reject(err));
  });
}

_getPatientWarningInfoToDoctor = (warning, patient) => {
  return new Promise((resolve, reject) => {
    db.Sensor.findById(warning.sensor_id, { include: [{ model: db.Sensormodel }] }).then(
      res => resolve({
        "id": warning._id,
        "datetime": warning.datetime,
        "message": warning.message,
        "sensor_id": warning.sensor_id,
        "patient_id": patient.id,
        "seen_vitabox": warning.seen_vitabox,
        "what": res.Sensormodel.to_read,
        "who": utils.decrypt(patient.name)
      }),
      err => reject(err));
  });
}