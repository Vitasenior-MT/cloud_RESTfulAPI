var db = require('../../models/index');

exports.create = (body) => {
    return new Promise((resolve, reject) => {
        var valid_records = [], has_invalid = false;
        body.forEach(element => {
            if (element.value !== null && element.value !== undefined && element.datetime)
                valid_records.push({
                    value: element.value,
                    datetime: element.datetime,
                    patient_id: (element.patient_id && element.patient_id !== "") ? element.patient_id : null,
                    board_id: element.board_id,
                    sensor_id: element.sensor_id
                });
            else has_invalid = true
        });
        db.RecordTemp.insertMany(valid_records, (error, doc) => {
            if (error) reject({ code: 500, msg: error.message });
            else resolve({ records: valid_records, has_invalid: has_invalid });
        });
    });
}

exports.listByPatientSensor = (current_user, patient_id, sensor_id, page) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) _getRecordsWhere({ 'patient_id': patient_id, 'sensor_id': sensor_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
        else db.Patient.findById(patient_id, { include: [{ model: db.Vitabox }] }).then(
            patient => {
                if (patient.Vitabox) patient.Vitabox.hasUser(current_user).then(
                    success => {
                        if (success) _getRecordsWhere({ 'patient_id': patient_id, 'sensor_id': sensor_id }, page).then(
                            docs => resolve(docs),
                            error => reject({ code: 500, msg: error.message }));
                        else reject({ code: 401, msg: "Unauthorized" });
                    }, error => reject({ code: 500, msg: error.message }));
                else reject({ code: 401, msg: "This patient doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.listByBoardSensor = (current_user, board_id, sensor_id, page) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) _getRecordsWhere({ 'board_id': board_id, 'sensor_id': sensor_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
        else db.Board.findById(board_id, { include: [{ model: db.Vitabox }] }).then(
            board => {
                if (board.Vitabox) board.Vitabox.hasUser(current_user).then(
                    success => {
                        if (success) _getRecordsWhere({ 'board_id': board_id, 'sensor_id': sensor_id }, page).then(
                            docs => resolve(docs),
                            error => reject({ code: 500, msg: error.message }));
                        else reject({ code: 401, msg: "Unauthorized" });
                    }, error => reject({ code: 500, msg: error.message }));
                else reject({ code: 401, msg: "This board doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.listBySensor = (sensor_id, page) => {
    return new Promise((resolve, reject) => {
        _getRecordsWhere({ 'sensor_id': sensor_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.withdrawsAccess = (obj) => {
    return new Promise((resolve, reject) => {
        _getAllRecordsWhere(obj).then(
            docs => db.RecordOld.insertMany(docs, (error, doc) => {
                if (error) reject({ code: 500, msg: error.message });
                else _removeRecordsWhere(obj).then(
                    () => resolve(),
                    error => reject({ code: 500, msg: error.message }));
            }),
            error => reject({ code: 500, msg: error.message }));
    });
}

_getRecordsWhere = (obj, page) => {
    return new Promise((resolve, reject) => {
        db.RecordTemp.find().where(obj).sort('-datetime').select("-_id").skip((page - 1) * 25).limit(25).exec((error, temp_doc) => {
            if (error) reject(error);
            else {
                if (temp_doc.length === 25) resolve(temp_doc);
                else db.RecordTemp.count(obj, (error, count) => {
                    if (error) reject(error);
                    else db.RecordCheck.find().where(obj).sort('-datetime').select("-_id").skip((page - Math.floor(count / 25) - 1) * 25).limit(25 - temp_doc.length).exec((error, check_doc) => {
                        if (error) reject(error);
                        else resolve(temp_doc.concat(check_doc));
                    });
                })
            }
        });
    });
}

_getAllRecordsWhere = (obj) => {
    return new Promise((resolve, reject) => {
        let promise_temp = new Promise((resolve, reject) => {
            db.RecordTemp.find().where(obj).exec((error, doc) => {
                if (error) reject(error);
                else resolve(doc);
            });
        });
        let promise_check = new Promise((resolve, reject) => {
            db.RecordCheck.find().where(obj).exec((error, doc) => {
                if (error) reject(error);
                else resolve(doc);
            });
        });
        Promise.all([promise_temp, promise_check]).then(
            docs => resolve(docs[0].concat(docs[1])),
            error => reject(error));
    });
}

_removeRecordsWhere = (obj) => {
    return new Promise((resolve, reject) => {
        let promise_temp = new Promise((resolve, reject) => {
            db.RecordTemp.remove(obj).exec(error => {
                if (error) reject(error);
                else resolve();
            });
        });
        let promise_check = new Promise((resolve, reject) => {
            db.RecordCheck.remove(obj).exec(error => {
                if (error) reject(error);
                else resolve();
            });
        });
        Promise.all([promise_temp, promise_check]).then(
            () => resolve(),
            error => reject(error));
    });
}