var db = require('../../models/index'),
  utils = require('./utils'),
  vitabox = require('./vitabox');

exports.create = (attributes) => {
  return new Promise((resolve, reject) => {
    if (attributes.mac_addr) {
      let password = utils.generatePassword(10);
      let encrypted = utils.encrypt([password]);
      if (!encrypted.error) db.Board.create({
        mac_addr: attributes.mac_addr.toLowerCase(),
        boardmodel_id: attributes.model,
        node_id: attributes.mac_addr.substr(attributes.mac_addr.lastIndexOf(":") - 2).replace(":", "").toLowerCase(),
        password: encrypted.value[0]
      }).then(
        board => resolve({ board, password }),
        error => reject({ code: 500, msg: error.message }));
      else reject({ code: 500, msg: encrypted.error.message });
    } else reject({ code: 500, msg: "MAC address is required" });
  });
}

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(id, {
      attributes: ['id', 'mac_addr', 'vitabox_id', 'description'],
      include: [
        { model: db.Boardmodel, attributes: ['id', 'type', 'name'] },
        {
          model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
          include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
        }]
    }).then(
      board => {
        if (board) {
          board.description = board.description ? utils.decrypt(board.description) : null;
          resolve(board);
        }
        else reject({ code: 500, msg: "board not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.findByMAC = (mac_addr) => {
  return new Promise((resolve, reject) => {
    db.Board.findOne({ where: { mac_addr: mac_addr } }).then(
      board => {
        if (board) resolve(board);
        else reject({ code: 500, msg: "board not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.authenticate = (mac_addr, password) => {
  return new Promise((resolve, reject) => {
    let encrypted = utils.encrypt([password]);
    if (!encrypted.error) db.Board.findOne({
      where: { mac_addr: mac_addr, password: encrypted.value[0] },
      attributes: ['id', 'mac_addr', 'active', ['created_at', 'since']],
      include: [
        { model: db.Boardmodel, attributes: ['id', 'type', 'name'] },
        { model: db.Vitabox },
        {
          model: db.Sensor, attributes: ['id'],
          include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
        }]
    }).then(
      board => {
        if (board) if (!board.Vitabox) resolve(board);
        else reject({ code: 500, msg: "board already in use" });
        else reject({ code: 500, msg: "MAC address and password don't match" });
      }, error => reject({ code: 500, msg: error.message }));
    else reject({ code: 500, msg: encrypted.error.message });
  });
}

exports.setDescription = (board, description) => {
  return new Promise((resolve, reject) => {
    let encrypted = (description !== "" && description !== null) ? utils.encrypt([description]) : [null];
    board.update({ description: encrypted[0], active: true }).then(
      () => resolve(),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.updateDescription = (board, description) => {
  return new Promise((resolve, reject) => {
    let encrypted = (description !== "" && description !== null) ? utils.encrypt([description]) : [null];
    board.update({ description: encrypted[0] }).then(
      () => resolve(),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.switchMac = (board_id, mac_addr) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => board.update({ mac_addr: mac_addr }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.updateFrequency = (board_id, patient_id, frequency) => {
  return new Promise((resolve, reject) => {
    db.PatientBoard.findOne({ where: { board_id: board_id, patient_id: patient_id } }).then(
      board => board.update({ frequency: frequency }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.removeDescription = (board_id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id, {
      include: [
        { model: db.Patient, attributes: ['id'] },
        {
          model: db.Sensor, attributes: ['id'],
          include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
        }]
    }).then(
      board => {
        let promises = [
          db.PatientBoard.destroy({ where: { board_id: board_id } }),
          board.update({ description: null, active: false })
        ];
        board.Patients.map(patient =>
          board.Sensors.map(sensor =>
            promises.push(db.Profile.destroy({ where: { patient_id: patient.id, tag: sensor.Sensormodel.tag } }))
          ));
        Promise.all(promises).then(
          () => resolve(),
          error => reject({ code: 500, msg: error.message })),
          error => reject({ code: 500, msg: error.message })
      })
  });
}

exports.enable = (board_id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => board.update({ active: true }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.disable = (board_id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => board.update({ active: false }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.addPatient = (board, patient_id) => {
  return new Promise((resolve, reject) => {
    board.hasPatient(patient_id).then(
      success => {
        if (!success) {
          db.Patient.findById(patient_id).then(
            patient => {
              let promises = [board.addPatient(patient_id)];
              if (board.Boardmodel.type === "wearable" && !board.description)
                promises.push(board.update({ description: patient.name }));
              Promise.all(promises).then(
                () => resolve(),
                error => reject({ code: 500, msg: error.message }))
            },
            error => reject({ code: 500, msg: error.message }));
        } else reject({ code: 500, msg: "board already registered to patient" });
      });
  });
}

exports.getPatients = (current_user, board_id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => {
        if (board) if (current_user.admin)
          board.getPatients({
            attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since'], 'active'],
            include: [{
              model: db.Board, attributes: ['id', 'mac_addr'],
              include: [
                { model: db.Boardmodel, attributes: ['id', 'type', 'name'] },
                {
                  model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
                  include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
                }]
            }],
          }).then(
            result => resolve(result),
            error => reject({ code: 500, msg: error.message }));
        else vitabox.verifySponsor(current_user, board.vitabox_id).then(
          () => board.getPatients({
            attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since'], 'active'],
            include: [{
              model: db.Board, attributes: ['id', 'mac_addr'],
              include: [
                { model: db.Boardmodel, attributes: ['id', 'type', 'name'] },
                {
                  model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
                  include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
                }]
            }],
          }).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Board not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.getSensors = (board_id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => {
        if (board) board.getSensors({
          attributes: ['id', 'last_commit', 'last_values'],
          include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at', 'tag'] } }]
        }).then(
          sensors => resolve(sensors),
          error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "board model not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.listInactive = (current_user, own) => {
  return new Promise((resolve, reject) => {
    db.Board.findAll({
      attributes: ['id', 'password', 'created_at', "vitabox_id", "mac_addr"],
      where: { vitabox_id: null },
      include: [{ model: db.Boardmodel, attributes: ['name'] }]
    }).then(
      list => {
        list.forEach(element => element.password = utils.decrypt(element.password));
        resolve(list);
      },
      error => reject({ code: 500, msg: error.message }));
  });
}