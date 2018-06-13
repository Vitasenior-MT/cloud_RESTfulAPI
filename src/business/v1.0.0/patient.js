var db = require('../../models/index'),
    utils = require('./utils');

exports.createIfNotExists = (attributes) => {
    return new Promise((resolve, reject) => {
        if (["male", "female", "undefined"].includes(attributes.gender))
            if (/[A-Z][a-zA-Z\'áéíóõãÁÉÍÓ][^#&<>\"~;$^%{}?!*+_\-»«@£§€ªº,0-9]{1,50}$/.test(attributes.name)) {
                let encrypted = utils.encrypt([attributes.name.replace(/\b\w/g, l => l.toUpperCase())]);
                if (!encrypted.error) {
                    db.Patient.findOne({ where: { name: encrypted.value[0], birthdate: attributes.birthdate } }).then(
                        patient => {
                            if (patient) resolve(patient);
                            else db.Patient.create({
                                name: encrypted.value[0],
                                birthdate: attributes.birthdate,
                                gender: attributes.gender,
                                height: attributes.height,
                                weight: attributes.weight
                            }).then(
                                patient => resolve(patient),
                                error => reject({ code: 500, msg: error.message })
                            ), error => reject({ code: 500, msg: error.message })
                        }, error => reject({ code: 500, msg: error.message }));
                } else reject({ code: 500, msg: encrypted.error.message });
            } else reject({ code: 500, msg: "invalid name" });
        else reject({ code: 500, msg: "invalid gender, must be 'male', 'female' or 'undefined'" });
    });
}

exports.find = function (patient_id) {
    return new Promise((resolve, reject) => {
        db.Patient.findById(patient_id).then(
            patient => {
                if (patient) resolve(patient)
                else reject({ code: 500, msg: "Patient not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.disable = (patient_id) => {
    return new Promise((resolve, reject) => {
        db.Patient.findById(patient_id).then(
            patient => patient.update({ active: false }).then(
                result => resolve(result),
                error => reject({ code: 500, msg: error.message })),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.enable = (patient_id) => {
    return new Promise((resolve, reject) => {
        db.Patient.findById(patient_id).then(
            patient => patient.update({ active: true }).then(
                () => resolve(),
                error => reject({ code: 500, msg: error.message })),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.getBoards = function (patient_id) {
    return new Promise((resolve, reject) => {
        db.Patient.findById(patient_id).then(
            patient => {
                if (patient) patient.getBoards({
                    attributes: ['id', 'mac_addr'],
                    include: [
                        { model: db.Boardmodel, attributes: ['id', 'type', 'name'] },
                        {
                            model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
                            include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
                        }]
                }).then(
                    result => resolve(result),
                    error => reject({ code: 500, msg: error.message }));
                else reject({ code: 500, msg: "Patient not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.addDoctor = (patient, doctor_id) => {
    return new Promise((resolve, reject) => {
        patient.addUser(doctor_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.getDoctors = (patient) => {
    return new Promise((resolve, reject) => {
        patient.getUsers({ attributes: ['id', 'email', 'name'] }).then(
            users => {
                users.forEach(user => {
                    user.email = utils.decrypt(user.email);
                    user.name = utils.decrypt(user.name);
                    user.dataValues.since = user.DoctorPatient.created_at;
                    delete user.dataValues.DoctorPatient;
                });
                resolve(users);
            },
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.removeDoctor = (patient, doctor_id) => {
    return new Promise((resolve, reject) => {
        patient.removeUser(doctor_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
    });
}