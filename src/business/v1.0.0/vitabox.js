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
    if (attributes.address) db.Vitabox.findOne({ where: { id: vitabox_id, registered: false } }).then(
      vitabox => {
        if (vitabox) {
          console.log(attributes);
          let encrypted = utils.encrypt([attributes.address, attributes.password]);
          console.log(vitabox.password, encrypted.value[1], vitabox.password === encrypted.value[1])
          if (!encrypted.error && (vitabox.password === encrypted.value[1] || is_admin)) {
            vitabox.update({ registered: true, address: encrypted.value[0], longitude: attributes.longitude, latitude: attributes.latitude }).then(
              vitabox => vitabox.addUser(sponsor.id, { through: { sponsor: true } }).then(
                () => {
                  vitabox.address = attributes.address;
                  resolve(vitabox)
                },
                error => reject({ code: 500, msg: error.message })),
              error => reject({ code: 500, msg: error.message }));
          } else reject({ code: 500, msg: "Vitabox id and password don´t match" });
        } else reject({ code: 500, msg: "Vitabox already registered or doesn´t exist" });
      }, error => reject({ code: 500, msg: error.message }));
    else reject({ code: 500, msg: "Vitabox address must be defined" });
  });
}

exports.requestToken = (vitabox_id, password) => {
  return new Promise((resolve, reject) => {
    let encrypted = utils.encrypt([password]);
    if (!encrypted.error) db.Vitabox.findOne({ where: { password: encrypted.value[0], id: vitabox_id, registered: true } }).then(
      vitabox => {
        if (vitabox) if (vitabox.registered) if (!vitabox.active)
          vitabox.update({ active: true }).then(
            vitabox => resolve(vitabox),
            error => reject({ code: 500, msg: error.message }));
        else resolve(vitabox);
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
          list.forEach(element => element.address = utils.decrypt(element.address));
          resolve(list);
        }, error => reject({ code: 500, msg: error.message }));
    else current_user.getVitaboxes({ attributes: ['id', 'latitude', 'longitude', 'address', 'active'] }).then(
      list => {
        list.forEach(element => {
          element.address = utils.decrypt(element.address);
          element.dataValues.sponsor = element.UserVitabox.sponsor;
          delete element.dataValues.UserVitabox;
        });
        resolve(list);
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.find = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id, { attributes: { exclude: ['password'] } }).then(
      vitabox => {
        if (vitabox) resolve(vitabox);
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.update = (current_user, vitabox_id, attributes) => {
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

exports.delete = (current_user, vitabox_id) => {
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

exports.addUser = (current_user, vitabox_id, user_id, is_sponsor) => {
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

exports.addPatient = (current_user, vitabox_id, patient_id) => {
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

exports.getPatients = (vitabox, where_condiction) => {
  return new Promise((resolve, reject) => {
    vitabox.getPatients({
      where: where_condiction,
      attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since'], 'active', 'weight', 'height'],
      include: [{
        model: db.Board, attributes: ['id', 'mac_addr'],
        include: [
          { model: db.Boardmodel, attributes: ['id', 'type', 'name', 'tag'] },
          {
            model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
            include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
          }]
      },
      { model: db.Profile },
      { model: db.User, as: 'Doctors', attributes: ['id', 'name', "email"] }],
    }).then(
      patients => {
        patients.forEach(patient => {
          patient.name = utils.decrypt(patient.name);
          patient.Boards.forEach(board => delete board.dataValues.PatientBoard);
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

exports.addBoard = (current_user, vitabox_id, board_id) => {
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
          }, error => reject(error));
        else reject({ code: 500, msg: "Vitabox not found" });
      }, error => reject({ code: 500, msg: error.message }));
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
      boards => resolve(boards),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.verifySponsor = (current_user, vitabox_id) => {
  return new Promise((resolve, reject) => {
    db.Vitabox.findById(vitabox_id).then(
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