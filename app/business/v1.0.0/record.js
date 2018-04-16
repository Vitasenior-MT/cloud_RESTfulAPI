var db = require('../../models/index');

exports.create =  (body) => {
    return new Promise((resolve, reject) => {
        var to_insert = [], invalid = false;
        body.forEach(element => {
            if (element.board_id && element.board_id !== '' && element.sensor_id && element.sensor_id !== '' && element.value && element.datetime)
                to_insert.push({
                    value: element.value,
                    datetime: element.datetime,
                    patient_id: (element.patient_id && element.patient_id !== "") ? element.patient_id : null,
                    board_id: element.board_id,
                    sensor_id: element.sensor_id,
                    available: true
                });
            else invalid = true
        });
        db.Record.insertMany(to_insert, (error, doc) => {
            if (error) reject({ code: 500, msg: error.message });
            else resolve(invalid);
        });
    });
}

exports.listByPatient =  (current_user, patient_id) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) db.Record.find().where('patient_id').equals(patient_id).select("-_id").exec((error, doc) => {
            if (error) reject(error);
            else resolve(doc);
        });
        else db.Patient.findById(patient_id, { include: [{ model: db.Vitabox }] }).then(
            patient => {
                if (patient.Vitabox) patient.Vitabox.hasUser(current_user).then(
                    success => {
                        if (success)
                            db.Record.find().where({ 'patient_id': patient_id, 'available': true }).select("-_id -available").exec((error, doc) => {
                                if (error) reject({ code: 500, msg: error.message });
                                else resolve(doc);
                            });
                        else reject({ code: 401, msg: "Unauthorized" });
                    }, error => reject({ code: 500, msg: error.message }));
                else reject({ code: 401, msg: "This patient doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.listByBoard =  (current_user, board_id) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) db.Record.find().where('board_id').equals(board_id).select("-_id").exec((error, doc) => {
            if (error) reject(error);
            else resolve(doc);
        });
        else db.Board.findById(board_id, { include: [{ model: db.Vitabox }] }).then(
            board => {
                if (board.Vitabox) board.Vitabox.hasUser(current_user).then(
                    success => {
                        if (success)
                            db.Record.find().where({ 'board_id': board_id, 'available': true }).select("-_id -available").exec((error, doc) => {
                                if (error) reject({ code: 500, msg: error.message });
                                else resolve(doc)
                            });
                        else reject({ code: 401, msg: "Unauthorized" });
                    }, error => reject({ code: 500, msg: error.message }));
                else reject({ code: 401, msg: "This board doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.listBySensor =  (current_user, sensor_id) => {
    return new Promise((resolve, reject) => {
        db.Record.find().where({ 'sensor_id': sensor_id }).select("-_id").exec((error, doc) => {
            if (error) reject({ code: 500, msg: error.message });
            else resolve(doc);
        });
    });
}

exports.withdrawsAccess =  (field, value) => {
    return new Promise((resolve, reject) => {
        db.Record.where({ field: value }).setOptions({ multi: true }).update({ 'available': false }).exec((error, doc) => {
            if (error) reject({ code: 500, msg: error.message });
            else resolve();
        });
    });
}