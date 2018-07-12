var db = require('../../models/index');

exports.listFromPage = (current_user, sensor_id, page) => {
    return new Promise((resolve, reject) => {
        if (current_user.admin) _getRecordsWhere({ 'sensor_id': sensor_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
        else db.Sensor.findById(sensor_id, { include: [{ model: db.Board, include: [{ model: db.Vitabox }] }] }).then(
            sensor => {
                if (sensor.Board.Vitabox) {
                    sensor.Board.Vitabox.hasUser(current_user).then(
                        success => {
                            if (success) {
                                _getRecordsWhere({ 'sensor_id': sensor_id }, page).then(
                                    docs => resolve(docs),
                                    error => reject({ code: 500, msg: error.message }));
                            } else reject({ code: 401, msg: "Unauthorized" });
                        }, error => reject({ code: 500, msg: error.message }));
                } else reject({ code: 401, msg: "This board doesn't belong to the vitabox" });
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
                if (sensor.Board.Vitabox) {
                    if (sensor.Board.Patients.filter(x => x.id === patient_id).length > 0) {
                        sensor.Board.Vitabox.hasUser(current_user).then(
                            success => {
                                if (success) _getRecordsWhere({ 'sensor_id': sensor_id, 'patient_id': patient_id }, page).then(
                                    docs => resolve(docs),
                                    error => reject({ code: 500, msg: error.message }));
                                else reject({ code: 401, msg: "Unauthorized" });
                            }, error => reject({ code: 500, msg: error.message }));
                    } else reject({ code: 500, msg: "This sensor doesn't belong to the patient" });
                } else reject({ code: 401, msg: "This sensor doesn't belong to the vitabox" });
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
                    if (sensor.Board.Patients.filter(x => x.id === patient_id).length > 0)
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

_getRecordsWhere = (obj, page) => {
    return new Promise((resolve, reject) => {
        db.Record.find().where(obj).sort('-datetime').select("-_id").skip((page - 1) * 25).limit(25).exec((error, records) => {
            if (error) reject(error);
            resolve(records);
        });
    });
}

_getAllRecordsWhere = (obj) => {
    return new Promise((resolve, reject) => {
        db.Record.find().where(obj).exec((error, records) => {
            if (error) reject(error);
            else resolve(records);
        });
    });
}