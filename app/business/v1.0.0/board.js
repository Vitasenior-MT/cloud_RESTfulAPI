var db = require('../../models/index');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        db.Board.create({ location: attributes.location, mac_address: attributes.mac_address, boardmodel_id: attributes.model }).then(
            board => resolve(board),
            error => reject(error));
    });
}

exports.find = (board_id) => {
    return new Promise((resolve, reject) => {
        db.Board.findById(board_id).then(
            board => {
                board.getBoardmodel().then(
                    model => resolve(model),
                    error => reject(error))
            },
            error => reject(error));
    });
}

exports.remove = (board_id) => {
    return new Promise((resolve, reject) => {
        db.Board.findById(board_id).then(
            board => board.destroy().then(
                () => resolve(),
                error => reject(error)),
            error => reject(error));
    });
}