var db = require('../../models/index');

exports.create = function (body) {
    return new Promise((resolve, reject) => {
        var to_insert = [], invalid = false;
        body.forEach(element => {
            if (element.board_id && element.board_id !== '' && element.sensor_id && element.sensor_id !== '' && element.value && element.datetime)
                to_insert.push({
                    value: element.value,
                    datetime: element.datetime,
                    patient_id: (element.patient_id && element.patient_id !== "") ? element.patient_id : null,
                    board_id: element.board_id,
                    sensor_id: element.sensor_id
                });
            else invalid = true
        });
        db.Record.insertMany(to_insert, (error, doc) => {
            if (error) reject(error);
            else resolve(invalid);
        });
    });
}

exports.listByPatient = function (current_user, patient_id) {
    return new Promise((resolve, reject) => {
        if (current_user.admin) db.Record.find().where('patient_id').equals(patient_id).select("-_id").exec((error, doc) => {
            if (error) reject(error);
            else resolve(doc);
        });
        else db.Patient.findById(patient_id, { include: [{ model: db.Vitabox }] }).then(
            patient => patient.Vitabox.hasUser(current_user).then(
                success => {
                    if (success)
                        db.Record.find().where('patient_id').equals(patient_id).select("-_id").exec((error, doc) => {
                            if (error) reject(error);
                            else resolve(doc);
                        });
                    else reject("Unauthorized");
                },
                error => reject(error)),
            error => reject(error));
    });
}

exports.listByBoard = function (current_user, board_id) {
    return new Promise((resolve, reject) => {
        if (current_user.admin) db.Record.find().where('board_id').equals(board_id).select("-_id").exec((error, doc) => {
            if (error) reject(error);
            else resolve(doc);
        });
        else db.Board.findById(board_id, { include: [{ model: db.Vitabox }] }).then(
            board => board.Vitabox.hasUser(current_user).then(
                success => {
                    if (success)
                        db.Record.find().where('board_id').equals(board_id).select("-_id").exec((error, doc) => {
                            if (error) reject(error);
                            else resolve(doc)
                        });
                    else reject("Unauthorized");
                },
                error => reject(error)),
            error => reject(error));
    });
}

exports.listBySensor = function (current_user, sensor_id) {
    return new Promise((resolve, reject) => {
        db.Record.find().where('sensor_id').equals(sensor_id).select("-_id").exec((error, doc) => {
            if (error) reject(error);
            else resolve(doc);
        });
    });
}