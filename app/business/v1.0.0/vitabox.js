var db = require('../../models/index'),
  utils = require('./utils');

exports.create = function () {
  return new Promise((resolve, reject) => {
    let password = utils.generatePassword();
    utils.encrypt([password]).then(
      encrypted => db.Vitabox.create({ password: encrypted[0] }).then(
        vitabox => resolve({ id: vitabox.id, password: password }),
        error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.register = function (vitabox_id, attributes) {
  return new Promise((resolve, reject) => {
    if (attributes.address) db.Vitabox.findOne({ where: { id: vitabox_id, registered: false } }).then(
      vitabox => {
        if (vitabox) vitabox.update({ registered: true, address: attributes.address, longitude: attributes.longitude, latitude: attributes.latitude }).then(
          () => resolve(vitabox),
          error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "Vitabox already registered or doesn´t exist" });
      }, error => reject({ code: 500, msg: error.message }));
    else reject({ code: 500, msg: "Vitabox address must be defined" });
  });
}

exports.connect = function (vitabox_id, password) {
  return new Promise((resolve, reject) => {
    utils.encrypt([password]).then(
      encrypted => db.Vitabox.findOne({ where: { password: encrypted[0], id: vitabox_id, registered: true } }).then(
        vitabox => {
          if (vitabox) if (!vitabox.active) vitabox.update({ active: true }).then(
            vitabox => resolve(vitabox),
            error => reject({ code: 500, msg: error.message }));
          else resolve(vitabox);
          else reject({ code: 500, msg: "vitabox not found, verify if was already created and registered" });
        }, error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.list = function (current_user) {
  return new Promise((resolve, reject) => {
    if (current_user.admin)
      db.Vitabox.findAll({ attributes: { exclude: ['password'] } }).then(
        list => resolve(list),
        error => reject({ code: 500, msg: error.message }));
    else current_user.getVitaboxes({ attributes: ['id', 'latitude', 'longitude', 'address'], where: { active: true } }).then(
      list => {
        list.forEach(element => {
          element.dataValues.sponsor = element.dataValues.UserVitabox.dataValues.sponsor;
          delete element.dataValues.UserVitabox;
        })
        resolve(list);
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.find = function (current_user, vitabox_id) {
  return new Promise((resolve, reject) => {
    if (current_user.admin)
      db.Vitabox.findById(vitabox_id, { attributes: { exclude: ['password'] } }).then(
        vitabox => {
          if (vitabox) resolve(vitabox);
          else reject({ code: 500, msg: "Vitabox not found" });
        }, error => reject({ code: 500, msg: error.message }));
    else current_user.getVitaboxes({
      attributes: ['id', 'latitude', 'longitude', 'address'],
      where: { id: vitabox_id, active: true }
    }).then(vitabox => {
      if (vitabox.length > 0) {
        vitabox[0].dataValues.sponsor = vitabox[0].dataValues.UserVitabox.dataValues.sponsor;
        delete vitabox[0].dataValues.UserVitabox;
        resolve(vitabox[0]);
      } else reject({ code: 500, msg: "Vitabox not found" });
    }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.update = function (current_user, vitabox_id, attributes) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.update({ latitude: attributes.latitude, longitude: attributes.longitude, address: attributes.address, settings: attributes.settings }).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => vitabox.update({ latitude: attributes.latitude, longitude: attributes.longitude, address: attributes.address }).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found " });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.delete = function (current_user, vitabox_id) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.destroy().then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => vitabox.destroy().then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.addUser = function (current_user, vitabox_id, user_id, is_sponsor) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.addUser(user_id, { through: { sponsor: is_sponsor } }).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => vitabox.addUser(user_id, { through: { sponsor: is_sponsor } }).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.getUsers = function (is_user, client, vitabox_id) {
  return new Promise((resolve, reject) => {
    if (is_user) db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (client.admin)
          vitabox.getUsers({ attributes: ['id', 'email'] }).then(
            users => {
              users.forEach(user => {
                user.email = utils.decrypt(user.email);
                user.dataValues.since = user.dataValues.UserVitabox.dataValues.created_at;
                user.dataValues.sponsor = user.dataValues.UserVitabox.dataValues.sponsor;
                delete user.dataValues.UserVitabox;
              });
              resolve(users);
            },
            error => reject({ code: 500, msg: error.message }));
        else _isUser(vitabox, client).then(
          () => vitabox.getUsers({ attributes: ['id', 'email'] }).then(
            users => {
              users.forEach(user => {
                user.email = utils.decrypt(user.email);
                user.dataValues.since = user.dataValues.UserVitabox.dataValues.created_at;
                user.dataValues.sponsor = user.dataValues.UserVitabox.dataValues.sponsor;
                delete user.dataValues.UserVitabox;
              });
              resolve(users);
            },
            error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
    else client.getUsers({ attributes: ['id', 'email'] }).then(
      users => {
        users.forEach(user => {
          user.email = utils.decrypt(user.email);
          user.dataValues.since = user.dataValues.UserVitabox.dataValues.created_at;
          user.dataValues.sponsor = user.dataValues.UserVitabox.dataValues.sponsor;
          delete user.dataValues.UserVitabox;
        });
        resolve(users);
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.removeUser = function (current_user, vitabox_id, user_id) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.removeUser(user_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => {
            vitabox.removeUser(user_id).then(
              () => resolve(),
              error => reject({ code: 500, msg: error.message }));
          }, error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message })
    );
  });
}

exports.addPatient = function (current_user, vitabox_id, patient_id) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.addPatient(patient_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => {
            vitabox.addPatient(patient_id).then(
              () => resolve(),
              error => reject({ code: 500, msg: error.message }));
          }, error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message })
    );
  });
}

exports.getPatients = function (is_user, client, vitabox_id) {
  return new Promise((resolve, reject) => {
    if (is_user) if (client.admin)
      db.Patient.findAll({ where: { vitabox_id: vitabox_id }, attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since']] }).then(
        patients => {
          patients.forEach(patient => patient.name = utils.decrypt(patient.name));
          resolve(patients);
        }, error => reject({ code: 500, msg: error.message }));
    else db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) _isUser(vitabox, client).then(
          () => db.Patient.findAll({ where: { vitabox_id: vitabox_id }, attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since']] }).then(
            patients => {
              patients.forEach(patient => patient.name = utils.decrypt(patient.name));
              resolve(patients);
            }, error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
    else client.getPatients({ attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since']] }).then(
      patients => {
        patients.forEach(patient => {
          patient.name = utils.decrypt(patient.name);
          delete patient.dataValues.VitaboxId;
        });
        resolve(patients);
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.removePatient = function (current_user, vitabox_id, patient_id) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.removePatient(patient_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => {
            vitabox.removePatient(patient_id).then(
              () => resolve(),
              error => reject({ code: 500, msg: error.message }));
          }, error => reject(error)
        );
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message })
    );
  });
}

exports.addBoard = function (current_user, vitabox_id, board_id) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.addBoard(board_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => {
            vitabox.addBoard(board_id).then(
              () => resolve(),
              error => reject({ code: 500, msg: error.message }));
          }, error => reject(error)
        );
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message })
    );
  });
}

exports.getBoards = function (is_user, client, vitabox_id) {
  return new Promise((resolve, reject) => {
    if (is_user) if (client.admin)
      db.Board.findAll({
        where: { vitabox_id: vitabox_id }, attributes: ['id', 'location', 'mac_addr', 'created_at'], include: [{
          model: db.Boardmodel, attributes: ['id', 'type', 'name'], include: [{
            model: db.Sensor, attributes: { exclude: ['created_at', 'updated_at'] }
          }]
        }]
      }).then(
        boards => {
          boards.forEach(board => board.Boardmodel.Sensors.forEach(sensor => delete sensor.dataValues.BoardSensor));
          resolve(boards);
        }, error => reject({ code: 500, msg: error.message }));
    else db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) _isUser(vitabox, client).then(
          () => db.Board.findAll({
            where: { vitabox_id: vitabox_id }, attributes: ['id', 'location', 'mac_addr', 'created_at'], include: [{
              model: db.Boardmodel, attributes: ['id', 'type', 'name'], include: [{
                model: db.Sensor, attributes: { exclude: ['created_at', 'updated_at'] }
              }]
            }]
          }).then(
            boards => {
              boards.forEach(board => board.Boardmodel.Sensors.forEach(sensor => delete sensor.dataValues.BoardSensor));
              resolve(boards);
            },
            error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
    else client.getBoards({
      attributes: ['id', 'location', 'mac_addr', 'node_id', 'created_at'], include: [{
        model: db.Boardmodel, attributes: ['id', 'type', 'name'], include: [{
          model: db.Sensor, attributes: { exclude: ['created_at', 'updated_at'] }
        }]
      }],
    }).then(
      boards => {
        boards.forEach(board => board.Boardmodel.Sensors.forEach(sensor => delete sensor.dataValues.BoardSensor));
        resolve(boards);
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.removeBoard = function (current_user, vitabox_id, board_id) {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
      vitabox => {
        if (vitabox) if (current_user.admin)
          vitabox.removeBoard(board_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else _isSponsor(vitabox, current_user).then(
          () => {
            vitabox.removeBoard(board_id).then(
              () => resolve(),
              error => reject({ code: 500, msg: error.message }));
          }, error => reject(error)
        );
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

// ________________________________________________________________________
// Private
// ________________________________________________________________________
_isSponsor = (vitabox, user) => {
  return new Promise((resolve, reject) => {
    vitabox.getUsers({ where: { id: user.id } }).then(
      users => {
        if (users.length > 0 && users[0].UserVitabox.sponsor) resolve();
        else reject({ code: 401, msg: "Unauthorized" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

_isUser = (vitabox, user) => {
  return new Promise((resolve, reject) => {
    vitabox.hasUser(user).then(
      success => {
        if (success) resolve();
        else reject({ code: 401, msg: "Unauthorized" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}