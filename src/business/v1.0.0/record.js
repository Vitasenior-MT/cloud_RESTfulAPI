var db = require('../../models/index');

exports.listFromPage = (sensor_id, page) => {
    return new Promise((resolve, reject) => {
        _getRecordsWhere({ 'sensor_id': sensor_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.listFromPageByPatient = ( sensor_id, patient_id, page) => {
    return new Promise((resolve, reject) => {
        _getRecordsWhere({ 'sensor_id': sensor_id, 'patient_id': patient_id }, page).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.listBetweenDates = (sensor_id, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        _getAllRecordsWhere({ 'sensor_id': sensor_id, 'datetime': { $gte: new Date(startDate), $lte: new Date(endDate) } }).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.listBetweenDatesByPatient = (sensor_id, patient_id, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        _getAllRecordsWhere({ 'sensor_id': sensor_id, 'patient_id': patient_id, 'datetime': { $gte: new Date(startDate), $lte: new Date(endDate) } }).then(
            docs => resolve(docs),
            error => reject({ code: 500, msg: error.message }));
    });
}

_getRecordsWhere = (query, page) => {
    return new Promise((resolve, reject) => {
        db.Record.find().where(query).sort('-datetime').select("-_id").skip((page - 1) * 25).limit(25).exec((error, records) => {
            if (error) reject(error);
            resolve(records);
        });
    });
}

_getAllRecordsWhere = (query) => {
    return new Promise((resolve, reject) => {
        db.Record.find().where(query).exec((error, records) => {
            if (error) reject(error);
            else resolve(records);
        });
    });
}