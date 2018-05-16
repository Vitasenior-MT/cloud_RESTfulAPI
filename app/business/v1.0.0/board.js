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
      attributes: ['id', 'mac_addr'],
      include: [
        { model: db.Boardmodel, attributes: ['id', 'type', 'name'] },
        {
          model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
          include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
        }]
    }).then(
      board => resolve(board),
      error => reject({ code: 500, msg: error.message }));
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
      attributes: ['id', 'description', 'mac_addr', 'active', ['created_at', 'since']],
      include: [{ model: db.Boardmodel, attributes: ['id', 'type', 'name'] }, { model: db.Vitabox }]
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
    board.update({ description: description, active: true }).then(
      () => resolve(),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.removeDescription = (board_id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => board.update({ description: null, active: false }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }))
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

exports.addPatient = function (current_user, board_id, patient_id) {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => {
        if (board) if (current_user.admin)
          board.addPatient(patient_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else vitabox.verifySponsor(current_user, board.vitabox_id).then(
          () => board.addPatient(patient_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message })),
          error => reject(error));
        else reject({ code: 500, msg: "Board not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.getPatients = function (current_user, board_id) {
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

exports.removePatient = function (current_user, board_id, patient_id) {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => {
        if (board) if (current_user.admin)
          board.removePatient(patient_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
        else vitabox.verifySponsor(current_user, board.vitabox_id).then(
          () => board.removePatient(patient_id).then(
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