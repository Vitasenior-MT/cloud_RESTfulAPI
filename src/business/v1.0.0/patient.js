var db = require('../../models/index'),
    utils = require('./utils');

exports.createIfNotExists = (attributes, vitabox_id) => {
    return new Promise((resolve, reject) => {
        if (["male", "female", "undefined"].includes(attributes.gender))
            if (/[A-Z][a-zA-Z\'áéíóõãÁÉÍÓ][^#&<>\"~;$^%{}?!*+_\-»«@£§€ªº,0-9]{1,50}$/.test(attributes.name)) {
                if (/[1256789]\d{8}$/.test(attributes.nif)) {
                    if (/^[0-9]{8}([ -]*[0-9][ ]*[A-Z]{2}[0-9])*$/.test(attributes.cc)) {
                        let encrypted = utils.encrypt([attributes.name.replace(/\b\w/g, l => l.toUpperCase()), attributes.cc, attributes.nif]);
                        if (!encrypted.error) {
                            db.Patient.findOne({ where: { name: encrypted.value[0], birthdate: attributes.birthdate } }).then(
                                patient => {
                                    if (patient) resolve(patient);
                                    else db.Patient.create({
                                        name: encrypted.value[0],
                                        birthdate: attributes.birthdate,
                                        gender: attributes.gender,
                                        vitabox_id: vitabox_id,
                                        active: false,
                                        cc: encrypted.value[1],
                                        nif: encrypted.value[2]
                                    }).then(
                                        patient => resolve(patient),
                                        error => reject({ code: 500, msg: error.message })
                                    ), error => reject({ code: 500, msg: error.message })
                                }, error => reject({ code: 500, msg: error.message }));
                        } else reject({ code: 500, msg: encrypted.error.message });
                    } else reject({ code: 500, msg: "invalid cc" });
                } else reject({ code: 500, msg: "invalid nif" });
            } else reject({ code: 500, msg: "invalid name" });
        else reject({ code: 500, msg: "invalid gender, must be 'male', 'female' or 'undefined'" });
    });
}

exports.find = function (patient_id) {
    return new Promise((resolve, reject) => {
        db.Patient.findById(patient_id, { include: [{ model: db.Vitabox }] }).then(
            patient => {
                if (patient) {
                    patient.name = utils.decrypt(patient.name);
                    patient.cc = utils.decrypt(patient.cc);
                    patient.nif = utils.decrypt(patient.nif);
                    resolve(patient);
                }
                else reject({ code: 500, msg: "Patient not found" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.setBiometricData = (patient_id, attributes) => {
    return new Promise((resolve, reject) => {
        db.Patient.findById(patient_id).then(
            patient => patient.update({
                profile: attributes.profile,
                height: attributes.height,
                weight: attributes.weight,
                active: true
            }).then(
                result => resolve(result),
                error => reject({ code: 500, msg: error.message })),
            error => reject({ code: 500, msg: error.message }));
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
        patient.addDoctor(doctor_id).then(
            result => {
                if (result.length > 0) resolve();
                else reject({ code: 500, msg: "doctor already associated to patient" })
            },
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.removeDoctor = (patient, doctor_id) => {
    return new Promise((resolve, reject) => {
        patient.removeDoctor(doctor_id).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
    });
}

exports.verifyDoctor = (current_user, patient) => {
    return new Promise((resolve, reject) => {
        if (typeof patient === "string") {
            db.Patient.findById(patient).then(
                patient => {
                    if (patient) _verifyDoctor(current_user.id, patient).then(
                        () => resolve(),
                        error => reject(error));
                    else reject({ code: 500, msg: "patient not found" });
                }, error => reject({ code: 500, msg: error.message }));
        } else _verifyDoctor(current_user.id, patient).then(
            () => resolve(),
            error => reject(error));
    });
}

exports.updatePhoto = (patient, filename) => {
    return new Promise((resolve, reject) => {
        patient.update({ photo: filename }).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
    });
}

//____________ PRIVATE ____________
//_________________________________

_verifyDoctor = (current_user_id, patient) => {
    return new Promise((resolve, reject) => {
        patient.getDoctors({ where: { id: current_user_id }, through: { accepted: true } }).then(
            users => {
                if (users.length > 0) resolve();
                else reject({ code: 401, msg: "Unauthorized" });
            }, error => reject({ code: 500, msg: error.message }));
    });
}