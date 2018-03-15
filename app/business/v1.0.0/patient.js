var db = require('../../models/index'),
    utils = require('./utils');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
        if (/[A-Z][a-zA-Z\'][^#&<>\"~;$^%{}?!*+_\-»«@£§€ªº,0-9]{1,20}$/.test(attributes.name))
            utils.encrypt([attributes.name]).then(
                encrypted_name => db.Patient.create({
                    name: encrypted_name[0],
                    birthdate: attributes.birthdate,
                    gender: attributes.gender
                }).then(
                    patient => resolve(patient),
                    error => reject(error)
                ), error => reject(error)
            );
        else reject({ code: 500, msg: "invalid name" });
    });
}