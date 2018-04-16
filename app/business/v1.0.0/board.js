var db = require('../../models/index'),
  utils = require('./utils');

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
        board => resolve({ id: board.id, mac_addr: board.mac_addr, password: password }),
        error => reject({ code: 500, msg: error.message }));
      else reject({ code: 500, msg: encrypted.error.message });
    } else reject({ code: 500, msg: "MAC address is required" });
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
    if (!encrypted.error) db.Board.findOne({ where: { mac_addr: mac_addr, password: encrypted.value[0] } }).then(
      board => {
        if (board) if (!board.vitabox_id) resolve(board);
        else reject({ code: 500, msg: "board already in use" });
        else reject({ code: 500, msg: "MAC address and password don't match" });
      }, error => reject({ code: 500, msg: error.message }));
    else reject({ code: 500, msg: encrypted.error.message });
  });
}

exports.setLocation = (board, location) => {
  return new Promise((resolve, reject) => {
    board.update({ location: location, active: true }).then(
      () => resolve(),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.removeLocation = (board_id) => {
  return new Promise((resolve, reject) => {
    db.Board.findById(board_id).then(
      board => board.update({ location: null, active: false }).then(
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
