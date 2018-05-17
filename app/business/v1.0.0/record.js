var db = require('../../models/index');

exports.create = (body) => {
    return new Promise((resolve, reject) => {
        var valid_records = [], has_invalid = false;
        body.forEach(element => {
            if (element.value !== null && element.value !== undefined && element.datetime && element.sensor_id)
                valid_records.push({
                    value: element.value,
                    datetime: element.datetime,
                    sensor_id: element.sensor_id,
                    patient_id: (element.patient_id && element.patient_id !== "") ? element.patient_id : null
                });
            else has_invalid = true
        });
        db.RecordTemp.insertMany(valid_records, (error, doc) => {
            if (error) reject({ code: 500, msg: error.message });
            else resolve({ records: valid_records, has_invalid: has_invalid });
        });
    });
}

exports.listFromPage = (current_user, sensor_id, page) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) _getRecordsWhere({ 'sensor_id': sensor_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
        else db.Sensor.findById(sensor_id, { include: [{ model: db.Board, include: [{ model: db.Vitabox }] }] }).then(
            sensor => {
                if (sensor.Board.Vitabox) sensor.Board.Vitabox.hasUser(current_user).then(
                    success => {
                        if (success) _getRecordsWhere({ 'sensor_id': sensor_id }, page).then(
                            docs => resolve(docs),
                            error => reject({ code: 500, msg: error.message }));
                        else reject({ code: 401, msg: "Unauthorized" });
                    }, error => reject({ code: 500, msg: error.message }));
                else reject({ code: 401, msg: "This board doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.listFromPageByPatient = (current_user, sensor_id, patient_id, page) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) _getRecordsWhere({ 'sensor_id': sensor_id, 'patient_id': patient_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
        else db.Sensor.findById(sensor_id, { include: [{ model: db.Board, include: [{ model: db.Vitabox }, { model: db.Patient }] }] }).then(
            sensor => {
                if (sensor.Board.Vitabox)
                    if (sensor.Board.Patient.filter(x => x.id === patient_id).length > 0)
                        sensor.Board.Vitabox.hasUser(current_user).then(
                            success => {
                                if (success) _getRecordsWhere({ 'sensor_id': sensor_id, 'patient_id': patient_id }, page).then(
                                    docs => resolve(docs),
                                    error => reject({ code: 500, msg: error.message }));
                                else reject({ code: 401, msg: "Unauthorized" });
                            }, error => reject({ code: 500, msg: error.message }));
                    else reject({ code: 500, msg: "This sensor doesn't belong to the patient" });
                else reject({ code: 401, msg: "This sensor doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.listBetweenDates = (current_user, sensor_id, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) _getAllRecordsWhere({ 'sensor_id': sensor_id, 'datetime': { $gte: new Date(startDate), $lte: new Date(endDate) } }).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
        else db.Sensor.findById(sensor_id, { include: [{ model: db.Board, include: [{ model: db.Vitabox }] }] }).then(
            sensor => {
                if (sensor.Board.Vitabox) sensor.Board.Vitabox.hasUser(current_user).then(
                    success => {
                        if (success) _getAllRecordsWhere({ 'sensor_id': sensor_id, 'datetime': { $gte: new Date(startDate), $lte: new Date(endDate) } }).then(
                            docs => resolve(docs),
                            error => reject({ code: 500, msg: error.message }));
                        else reject({ code: 401, msg: "Unauthorized" });
                    }, error => reject({ code: 500, msg: error.message }));
                else reject({ code: 401, msg: "This sensor doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.listBetweenDatesByPatient = (current_user, sensor_id, patient_id, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) _getAllRecordsWhere({ 'sensor_id': sensor_id, 'patient_id': patient_id, 'datetime': { $gte: new Date(startDate), $lte: new Date(endDate) } }).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
        else db.Sensor.findById(sensor_id, { include: [{ model: db.Board, include: [{ model: db.Vitabox }, { model: db.Patient }] }] }).then(
            sensor => {
                if (sensor.Board.Vitabox)
                    if (sensor.Board.Patient.filter(x => x.id === patient_id).length > 0)
                        sensor.Board.Vitabox.hasUser(current_user).then(
                            success => {
                                if (success) _getAllRecordsWhere({ 'sensor_id': sensor_id, 'patient_id': patient_id, 'datetime': { $gte: new Date(startDate), $lte: new Date(endDate) } }).then(
                                    docs => resolve(docs),
                                    error => reject({ code: 500, msg: error.message }));
                                else reject({ code: 401, msg: "Unauthorized" });
                            }, error => reject({ code: 500, msg: error.message }));
                    else reject({ code: 500, msg: "This sensor doesn't belong to the patient" });
                else reject({ code: 401, msg: "This sensor doesn't belong to the vitabox" });
            }, error => reject({ code: 500, msg: error.message }));
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