var db = require('../../models/index'),
  utils = require('./utils');

exports.create = () => {
  return new Promise((resolve, reject) => {
    let password = utils.generatePassword(10);
    let encrypted = utils.encrypt([password]);
    if (!encrypted.error) {
      db.Vitabox.create({ password: encrypted.value[0] }).then(
        vitabox => resolve({ id: vitabox.id, password: password }),
        error => reject({ code: 500, msg: error.message }));
    }
    else reject({ code: 500, msg: encrypted.error.message });
  });
}

exports.register = (vitabox_id, attributes, sponsor, is_admin) => {
  return new Promise((resolve, reject) => {
    if (attributes.address && attributes.district && attributes.locality)
      if (attributes.longitude && attributes.latitude && attributes.latitude > -90 && attributes.latitude < 90 && attributes.longitude > -180 && attributes.longitude < 180)
        db.Vitabox.findOne({ where: { id: vitabox_id, registered: false } }).then(
          vitabox => {
            if (vitabox) {
              let encrypted = utils.encrypt([
                attributes.address,
                attributes.password,
                attributes.district,
                attributes.locality,
                attributes.latitude + "+" + attributes.longitude
              ]);
              if (!encrypted.error && (vitabox.password === encrypted.value[1] || is_admin)) {
                vitabox.update({
                  registered: true,
                  address: encrypted.value[0],
                  district: encrypted.value[2],
                  locality: encrypted.value[3],
                  coordinates: encrypted.value[4]
                }).then(
                  vitabox => vitabox.addUser(sponsor.id, { through: { sponsor: true } }).then(
                    () => {
                      vitabox.address = attributes.address;
                      vitabox.district = attributes.district;
                      vitabox.locality = attributes.locality;
                      vitabox.dataValues.latitude = attributes.latitude;
                      vitabox.dataValues.longitude = attributes.longitude;
                      resolve(vitabox)
                    }, error => reject({ code: 500, msg: error.message })),
                  error => reject({ code: 500, msg: error.message }));
              } else reject({ code: 500, msg: "Vitabox id and password don´t match" });
            } else reject({ code: 500, msg: "Vitabox already registered or doesn´t exist" });
          }, error => reject({ code: 500, msg: error.message }));
      else reject({ code: 500, msg: "Vitabox map location must be valid" });
    else reject({ code: 500, msg: "Vitabox address, locality and district must be defined" });
  });
}

exports.requestToken = (vitabox_id, password) => {
  return new Promise((resolve, reject) => {
    let encrypted = utils.encrypt([password]);
    if (!encrypted.error) db.Vitabox.findOne({ where: { password: encrypted.value[0], id: vitabox_id, registered: true } }).then(
      vitabox => {
        if (vitabox) if (vitabox.registered) {
          let coords = utils.decrypt(vitabox.coordinates).split('+');
          vitabox.address = utils.decrypt(vitabox.address);
          vitabox.district = utils.decrypt(vitabox.district);
          vitabox.locality = utils.decrypt(vitabox.locality);
          vitabox.dataValues.latitude = coords[0];
          vitabox.dataValues.longitude = coords[1];
          if (!vitabox.active)
            vitabox.update({ active: true }).then(
              vitabox => resolve(vitabox),
              error => reject({ code: 500, msg: error.message }));
          else resolve(vitabox);
        }
        else reject({ code: 401, msg: "vitabox not registered" });
        else reject({ code: 401, msg: "invalid credentials or not registered" });
      }, error => reject({ code: 500, msg: error.message }));
    else reject({ code: 500, msg: encrypted.error.message });
  });
}

exports.list = (current_user, own) => {
  return new Promise((resolve, reject) => {
    if (current_user.admin && !own)
      db.Vitabox.findAll({ attributes: { exclude: ['password'] }, where: { registered: true } }).then(
        list => {
          list.forEach(element => {
            let coords = utils.decrypt(element.coordinates).split('+');
            element.address = utils.decrypt(element.address);
            element.district = utils.decrypt(element.district);
            element.locality = utils.decrypt(element.locality);
            element.dataValues.latitude = coords[0];
            element.dataValues.longitude = coords[1];
          });
          resolve(list);
        }, error => reject({ code: 500, msg: error.message }));
    else current_user.getVitaboxes({ attributes: { exclude: ['password'] } }).then(
      list => {
        list.forEach(element => {
          let coords = utils.decrypt(element.coordinates).split('+');
          element.address = utils.decrypt(element.address);
          element.district = utils.decrypt(element.district);
          element.locality = utils.decrypt(element.locality);
          element.dataValues.latitude = coords[0];
          element.dataValues.longitude = coords[1];
          element.dataValues.sponsor = element.UserVitabox.sponsor;
          delete element.dataValues.UserVitabox;
        });
        resolve(list);
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.listInactive = (current_user, own) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findAll({ attributes: ['id', 'password', 'created_at'], where: { registered: false } }).then(
      list => {
        list.forEach(element => element.password = utils.decrypt(element.password));
        resolve(list)
      },
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.find = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findOne({ where: { id: vitabox_id }, attributes: { exclude: ['password'] } }).then(
      vitabox => {
        if (vitabox) {
          let coords = utils.decrypt(vitabox.coordinates).split('+');
          vitabox.address = utils.decrypt(vitabox.address);
          vitabox.district = utils.decrypt(vitabox.district);
          vitabox.locality = utils.decrypt(vitabox.locality);
          vitabox.dataValues.latitude = coords[0];
          vitabox.dataValues.longitude = coords[1];
          resolve(vitabox);
        }
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.update = (current_user, vitabox_id, attributes) => {
  return new Promise((resolve, reject) => {
    if (attributes.address && attributes.district && attributes.locality)
      if (attributes.longitude && attributes.latitude && attributes.latitude > -90 && attributes.latitude < 90 && attributes.longitude > -180 && attributes.longitude < 180)
        db.Vitabox.findOne({ where: { id: vitabox_id } }).then(
          vitabox => {
            if (vitabox) {
              let encrypted = utils.encrypt([
                attributes.address,
                attributes.district,
                attributes.locality,
                attributes.latitude + "+" + attributes.longitude
              ]);
              if (!encrypted.error) if (current_user.admin)
                vitabox.update({
                  address: encrypted.value[0],
                  settings: attributes.settings,
                  district: encrypted.value[1],
                  locality: encrypted.value[2],
                  coordinates: encrypted.value[3]
                }).then(
                  () => resolve(),
                  error => reject({ code: 500, msg: error.message }));
              else _isSponsor(vitabox, current_user).then(
                () => vitabox.update({
                  address: encrypted.value[0],
                  district: encrypted.value[1],
                  locality: encrypted.value[2],
                  coordinates: encrypted.value[3]
                }).then(
                  () => resolve(),
                  error => reject({ code: 500, msg: error.message })),
                error => reject(error));
              else reject({ code: 500, msg: encrypted.error.message });
            } else reject({ code: 500, msg: "Vitabox not found " });
          }, error => reject({ code: 500, msg: error.message }));
      else reject({ code: 500, msg: "Vitabox map location must be valid" });
    else reject({ code: 500, msg: "Vitabox address, locality and district must be defined" });
  });
}

exports.delete = (current_user, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findOne({ where: { id: vitabox_id } }).then(
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

exports.addUser = (current_user, vitabox_id, user_id, is_sponsor) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findOne({ where: { id: vitabox_id } }).then(
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

exports.getUsers = (vitabox) => {
  return new Promise((resolve, reject) => {
    vitabox.getUsers({ attributes: ['id', 'email', 'name'] }).then(
      users => {
        users.forEach(user => {
          user.email = utils.decrypt(user.email);
          user.name = utils.decrypt(user.name);
          user.dataValues.since = user.dataValues.UserVitabox.dataValues.created_at;
          user.dataValues.sponsor = user.dataValues.UserVitabox.dataValues.sponsor;
          delete user.dataValues.UserVitabox;
        });
        resolve(users);
      },
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.removeUser = (current_user, vitabox_id, user_id) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findOne({ where: { id: vitabox_id } }).then(
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

exports.getPatients = (vitabox, where_condiction) => {
  return new Promise((resolve, reject) => {
    vitabox.getPatients({
      where: where_condiction,
      attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since'], 'active', 'weight', 'height', 'cc', 'nif', 'photo'],
      include: [
        {
          model: db.Board, attributes: ['id', 'mac_addr'],
          include: [
            { model: db.Boardmodel, attributes: ['id', 'type', 'name', 'tag'] },
            {
              model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
              include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
            }]
        },
        { model: db.Profile },
        { model: db.User, as: 'Doctors', attributes: ['id', 'name', "email"] }
      ]
    }).then(
      patients => {
        patients.forEach(patient => {
          patient.name = utils.decrypt(patient.name);
          patient.photo = patient.photo ? utils.decrypt(patient.photo) : null;
          patient.cc = utils.decrypt(patient.cc);
          patient.nif = utils.decrypt(patient.nif);
          patient.Boards.forEach(board => {
            board.dataValues.since = board.PatientBoard.created_at;
            board.dataValues.frequency = board.PatientBoard.frequency;
            board.dataValues.last_commit = board.PatientBoard.last_commit;
            delete board.dataValues.PatientBoard;
          });
          patient.Doctors.forEach(user => {
            user.name = utils.decrypt(user.name);
            user.email = utils.decrypt(user.email);
            user.dataValues.since = user.DoctorPatient.created_at;
            user.dataValues.accepted = user.DoctorPatient.accepted;
            delete user.dataValues.DoctorPatient;
          });
        });
        resolve(patients);
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.addBoard = (current_user, vitabox, board_id) => {
  return new Promise((resolve, reject) => {
    if (current_user.admin)
      vitabox.addBoard(board_id).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message }));
    else _isSponsor(vitabox, current_user).then(
      () => {
        vitabox.addBoard(board_id).then(
          () => resolve(),
          error => reject({ code: 500, msg: error.message }));
      }, error => reject(error));
  });
}

exports.getBoards = (vitabox, where_condiction) => {
  return new Promise((resolve, reject) => {
    vitabox.getBoards({
      where: where_condiction, attributes: ['id', 'description', 'mac_addr', 'node_id', 'updated_at', 'active'],
      include: [
        { model: db.Boardmodel, attributes: ['id', 'type', 'name', 'tag'] },
        {
          model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'], include:
            [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
        }]
    }).then(
      boards => {
        boards.map(board => board.description = board.description ? utils.decrypt(board.description) : null);
        resolve(boards)
      },
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.verifySponsor = (current_user, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findOne({ where: { id: vitabox_id } }).then(
      vitabox => {
        if (vitabox) _isSponsor(vitabox, current_user).then(
          () => resolve(vitabox),
          error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.verifyUser = (current_user, vitabox) => {
  return new Promise((resolve, reject) => {
    _isUser(vitabox, current_user).then(
      () => resolve(),
      error => reject(error));
  });
}

exports.findToReset = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findOne({
      where: { id: vitabox_id },
      include: [
        { model: db.Board },
        { model: db.User },
        {
          model: db.Patient, include: [
            { model: db.Board },
            { model: db.Profile },
            { model: db.User, as: 'Doctors' }
          ]
        }]
    }).then(
      vitabox => resolve(vitabox),
      error => reject({ code: 500, msg: error.message }));
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