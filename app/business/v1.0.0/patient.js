var db = require('../../models/db'),
    utils = require('./utils');

exports.create = (attributes) => {
    return new Promise((resolve, reject) => {
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
    });
}