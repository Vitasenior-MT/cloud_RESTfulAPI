var db = require('../../models/index'),
  utils = require('./utils');

exports.createToVitabox = (emitter, data, vitabox) => {
  return new Promise((resolve, reject) => {
    let encrypted = utils.encrypt([emitter.name, vitabox.address, data.message]);
    if (!encrypted.error)
      db.Notification.create({
        "emitter_id": emitter.id,
        "emitter": encrypted.value[0],
        "vitabox_id": vitabox.id,
        "vitabox": encrypted.value[1],
        "message": encrypted.value[2],
        "send_date": new Date()
      }, (err, res) => {
        if (err) reject({ code: 500, msg: err.message });
        resolve();
      });
  })
}

exports.createToPatient = (emitter, data, patient) => {
  return new Promise((resolve, reject) => {
    let encrypted = utils.encrypt([emitter.name, patient.name, data.message]);
    if (!encrypted.error)
      db.Notification.create({
        "emitter_id": emitter.id,
        "emitter": encrypted.value[0],
        "vitabox_id": patient.Vitabox.id,
        "vitabox": patient.Vitabox.address,
        "patient_id": patient.id,
        "patient": encrypted.value[1],
        "message": encrypted.value[2],
        "send_date": new Date()
      }, (err, res) => {
        if (err) reject({ code: 500, msg: err.message });
        resolve();
      });
    else reject({ code: 500, msg: encrypted.error.message });
  });
}

exports.checkByVitabox = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Notification.update({ vitabox_id: vitabox_id, check_date: null }, { "check_date": new Date() }, { multi: true }, (err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  });
}

exports.getByUser = (user_id, page) => {
  return new Promise((resolve, reject) => {
    if (page > 0) {
      db.Notification.find().where({ emitter_id: user_id }).sort('-send_date').skip((page - 1) * 25).limit(25).exec((err, res) => {
        if (err) reject({ code: 500, msg: err.message });
        resolve(res.map(x => {
          return {
            vitabox_id: x.vitabox_id,
            vitabox: utils.decrypt(x.vitabox),
            patient_id: x.patient_id,
            patient: x.patient ? utils.decrypt(x.patient) : null,
            message: utils.decrypt(x.message),
            send_date: x.send_date,
            check_date: x.check_date
          }
        }));
      });
    } else reject({ code: 500, msg: "invalid page" });
  })
}

exports.getByVitabox = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    if (page > 0) {
      db.Notification.find().where({ vitabox_id: vitabox_id }).sort('-send_date').skip((page - 1) * 25).limit(25).exec((err, res) => {
        if (err) reject({ code: 500, msg: err.message });
        resolve(res.map(x => {
          return {
            emitter_id: x.emitter_id,
            emitter: utils.decrypt(x.emitter),
            patient_id: x.patient_id,
            patient: utils.decrypt(x.patient),
            message: utils.decrypt(x.message),
            send_date: x.send_date,
            check_date: x.check_date
          }
        }));
      });
    } else reject({ code: 500, msg: "invalid page" });
  });
}

