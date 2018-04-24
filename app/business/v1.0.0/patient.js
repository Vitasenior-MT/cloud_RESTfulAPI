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
                                height: attributes.height
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

exports.disable = (patient_id) => {
    return new Promise((resolve, reject) => {
        db.Patient.findById(patient_id).then(
            patient => patient.update({ active: false }).then(
                () => resolve(),
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