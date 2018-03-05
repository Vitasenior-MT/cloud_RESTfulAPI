var db = require('../../models/index'),
    utils = require('./utils');

exports.create = function () {
    return new Promise((resolve, reject) => {
        let password = utils.generatePassword();
        utils.encrypt([password]).then(
            encrypted => {
                db.Vitabox.create({ password: encrypted[0] }).then(
                    vitabox => resolve({
                        id: vitabox.id,
                        password: password
                    }),
                    error => reject(error));
            }, error => reject(error));
    });
}

exports.register = function (vitabox_id, attributes) {
    return new Promise((resolve, reject) => {
        if (attributes.address) {
            db.Vitabox.findOne({ where: { id: vitabox_id, registered: false } }).then(vitabox => {
                if (vitabox) {
                    vitabox.update({ registered: true, address: attributes.address, longitude: attributes.longitude, latitude: attributes.latitude }).then(
                        () => resolve(vitabox),
                        error => reject(error));
                } else reject(new Error("Vitabox already registered or doesn´t exist"));
            }, error => reject(error));
        } else reject(new Error("Vitabox address must be defined"));
    });
}

exports.connect = function (vitabox_id, password) {
    return new Promise((resolve, reject) => {
        utils.encrypt([password]).then(
            encrypted => {
                db.Vitabox.findOne({ where: { password: encrypted[0], id: vitabox_id, registered: true } }).then(
                    vitabox => {
                        if (vitabox) {
                            vitabox.update({ active: true }).then(
                                () => resolve(vitabox),
                                error => reject(error));
                        } else reject(new Error("vitabox not found, verify if was already created and registered"));
                    }, error => reject(error));
            }, error => reject(error));
    });
}

exports.list = function (current_user) {
    return new Promise((resolve, reject) => {
        if (current_user.admin) {
            db.Vitabox.findAll({ attributes: { exclude: ['password'] } }).then(
                list => resolve(list),
                error => reject(error));
        } else {
            current_user.getVitaboxes({ attributes: ['id', 'latitude', 'longitude', 'address'], where: { active: true } }).then(
                list => {
                    list.forEach(element => {
                        element.dataValues.sponsor = element.dataValues.UserVitabox.dataValues.sponsor;
                        delete element.dataValues.UserVitabox;
                    })
                    resolve(list);
                }, error => reject(error));
        }
    });
}

exports.find = function (current_user, vitabox_id) {
    return new Promise((resolve, reject) => {
        if (current_user.admin) {
            db.Vitabox.findById(vitabox_id, { attributes: { exclude: ['password'] } }).then(
                vitabox => {
                    if (vitabox) resolve(vitabox);
                    else reject(new Error("Vitabox not found"));
                }, error => reject(error));
        }
        else {
            current_user.getVitaboxes({
                attributes: ['id', 'latitude', 'longitude', 'address'],
                where: { id: vitabox_id, active: true }
            }).then(vitabox => {
                if (vitabox.length > 0) {
                    vitabox[0].dataValues.sponsor = vitabox[0].dataValues.UserVitabox.dataValues.sponsor;
                    delete vitabox[0].dataValues.UserVitabox;
                    resolve(vitabox[0]);
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error));
        }
    });
}

exports.update = function (current_user, vitabox_id, attributes) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.update({ latitude: attributes.latitude, longitude: attributes.longitude, address: attributes.address, settings: attributes.settings }).then(
                            () => resolve(),
                            error => reject(error));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.update({ latitude: attributes.latitude, longitude: attributes.longitude, address: attributes.address }).then(
                                () => resolve(),
                                error => reject(error));
                        }, error => reject(error)
                    );
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error)
        );
    });
}

exports.delete = function (current_user, vitabox_id) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.destroy().then(
                            () => resolve(),
                            error => reject(error.message));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.destroy().then(
                                () => resolve(),
                                error => reject(error.message));
                        }, error => reject(error)
                    );
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error)
        );
    });
}

exports.addUser = function (current_user, vitabox_id, user_id, is_sponsor) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.addUser(user_id, { through: { sponsor: is_sponsor } }).then(
                            () => resolve(),
                            error => reject(error));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.addUser(user_id, { through: { sponsor: is_sponsor } }).then(
                                () => resolve(),
                                error => reject(error));
                        }, error => reject(error)
                    );
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error)
        );
    });
}

exports.getUsers = function (is_user, client, vitabox_id) {
    return new Promise((resolve, reject) => {
        if (is_user) {
            db.Vitabox.findById(vitabox_id).then(
                vitabox => {
                    if (vitabox) {
                        if (client.admin)
                            vitabox.getUsers({ attributes: ['id', 'email'] }).then(
                                users => {
                                    users.forEach(user => {
                                        user.email = utils.decrypt(user.email);
                                        user.dataValues.since = user.dataValues.UserVitabox.dataValues.created_at;
                                        user.dataValues.sponsor = user.dataValues.UserVitabox.dataValues.sponsor;
                                        delete user.dataValues.UserVitabox;
                                    });
                                    resolve(users);
                                },
                                error => reject(error));
                        else _isUser(vitabox, client).then(
                            () => {
                                vitabox.getUsers({ attributes: ['id', 'email'] }).then(
                                    users => {
                                        users.forEach(user => {
                                            user.email = utils.decrypt(user.email);
                                            user.dataValues.since = user.dataValues.UserVitabox.dataValues.created_at;
                                            user.dataValues.sponsor = user.dataValues.UserVitabox.dataValues.sponsor;
                                            delete user.dataValues.UserVitabox;
                                        });
                                        resolve(users);
                                    },
                                    error => reject(error));
                            }, error => reject(error)
                        );
                    } else reject(new Error("Vitabox not found"));
                }, error => reject(error));
        } else {
            client.getUsers({ attributes: ['id', 'email'] }).then(
                users => {
                    users.forEach(user => {
                        user.email = utils.decrypt(user.email);
                        user.dataValues.since = user.dataValues.UserVitabox.dataValues.created_at;
                        user.dataValues.sponsor = user.dataValues.UserVitabox.dataValues.sponsor;
                        delete user.dataValues.UserVitabox;
                    });
                    resolve(users);
                },
                error => reject(error));
        }
    });
}

exports.removeUser = function (current_user, vitabox_id, user_id) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.removeUser(user_id).then(
                            () => resolve(),
                            error => reject(error));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.removeUser(user_id).then(
                                () => resolve(),
                                error => reject(error));
                        }, error => reject(error));
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error)
        );
    });
}

exports.addPatient = function (current_user, vitabox_id, patient_id) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.addPatient(patient_id).then(
                            () => resolve(),
                            error => reject(error));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.addPatient(patient_id).then(
                                () => resolve(),
                                error => reject(error));
                        }, error => reject(error)
                    );
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error)
        );
    });
}

exports.getPatients = function (is_user, client, vitabox_id) {
    return new Promise((resolve, reject) => {
        if (is_user) {
            if (client.admin)
                db.Patient.findAll({ where: { vitabox_id: vitabox_id }, attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since']] }).then(
                    patients => {
                        patients.forEach(patient => patient.name = utils.decrypt(patient.name));
                        resolve(patients);
                    },
                    error => reject(error));
            else db.Vitabox.findById(vitabox_id).then(
                vitabox => {
                    if (vitabox) {
                        _isUser(vitabox, client).then(
                            () => {
                                db.Patient.findAll({ where: { vitabox_id: vitabox_id }, attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since']] }).then(
                                    patients => {
                                        patients.forEach(patient => patient.name = utils.decrypt(patient.name));
                                        resolve(patients);
                                    },
                                    error => reject(error));
                            }, error => reject(error));
                    } else reject(new Error("Vitabox not found"));
                }, error => reject(error));
        } else {
            client.getPatients({ attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since']] }).then(
                patients => {
                    patients.forEach(patient => {
                        patient.name = utils.decrypt(patient.name);
                        delete patient.dataValues.VitaboxId;
                    });
                    resolve(patients);
                },
                error => reject(error));
        }
    });
}

exports.removePatient = function (current_user, vitabox_id, patient_id) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.removePatient(patient_id).then(
                            () => resolve(),
                            error => reject(error));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.removePatient(patient_id).then(
                                () => resolve(),
                                error => reject(error));
                        }, error => reject(error)
                    );
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error)
        );
    });
}

exports.addBoard = function (current_user, vitabox_id, board_id) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.addBoard(board_id).then(
                            () => resolve(),
                            error => reject(error));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.addBoard(board_id).then(
                                () => resolve(),
                                error => reject(error));
                        }, error => reject(error)
                    );
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error)
        );
    });
}

exports.getBoards = function (is_user, client, vitabox_id) {
    return new Promise((resolve, reject) => {
        if (is_user) {
            if (client.admin)
                db.Board.findAll({
                    where: { vitabox_id: vitabox_id },
                    attributes: ['id', 'location', 'mac_address', 'created_at'],
                    include: [{
                        model: db.Boardmodel,
                        attributes: ['id', 'type', 'name'],
                        include: [{
                            model: db.Sensor,
                            attributes: { exclude: ['created_at', 'updated_at'] }
                        }]
                    }]
                }).then(
                    boards => {
                        boards.forEach(board => board.Boardmodel.Sensors.forEach(sensor => delete sensor.dataValues.BoardSensor));
                        resolve(boards);
                    },
                    error => reject(error));
            else db.Vitabox.findById(vitabox_id).then(
                vitabox => {
                    if (vitabox) {
                        _isUser(vitabox, client).then(
                            () => {
                                db.Board.findAll({
                                    where: { vitabox_id: vitabox_id },
                                    attributes: ['id', 'location', 'mac_address', 'created_at'],
                                    include: [{
                                        model: db.Boardmodel,
                                        attributes: ['id', 'type', 'name'],
                                        include: [{
                                            model: db.Sensor,
                                            attributes: { exclude: ['created_at', 'updated_at'] }
                                        }]
                                    }]
                                }).then(
                                    boards => {
                                        boards.forEach(board => board.Boardmodel.Sensors.forEach(sensor => delete sensor.dataValues.BoardSensor));
                                        resolve(boards);
                                    },
                                    error => reject(error));
                            }, error => reject(error));
                    } else reject(new Error("Vitabox not found"));
                }, error => reject(error));
        } else {
            client.getBoards({
                attributes: ['id', 'location', 'mac_address', 'created_at'],
                include: [{
                    model: db.Boardmodel,
                    attributes: ['id', 'type', 'name'],
                    include: [{
                        model: db.Sensor,
                        attributes: { exclude: ['created_at', 'updated_at'] }
                    }]
                }],
            }).then(
                boards => {
                    boards.forEach(board => board.Boardmodel.Sensors.forEach(sensor => delete sensor.dataValues.BoardSensor));
                    resolve(boards);
                },
                error => reject(error));
        }
    });
}

exports.removeBoard = function (current_user, vitabox_id, board_id) {
    return new Promise((resolve, reject) => {
        db.Vitabox.findById(vitabox_id).then(
            vitabox => {
                if (vitabox) {
                    if (current_user.admin)
                        vitabox.removeBoard(board_id).then(
                            () => resolve(),
                            error => reject(error));
                    else _isSponsor(vitabox, current_user).then(
                        () => {
                            vitabox.removeBoard(board_id).then(
                                () => resolve(),
                                error => reject(error));
                        }, error => reject(error)
                    );
                } else reject(new Error("Vitabox not found"));
            }, error => reject(error));
    });
}

// ________________________________________________________________________
// Private
// ________________________________________________________________________
_isSponsor = (vitabox, user) => {
    return new Promise((resolve, reject) => {
        vitabox.getUsers({ where: { id: user.id } }).then(
            users => {
                if (users.length > 0 && users[0].UserVitabox.sponsor) resolve();
                else reject(new Error("Unauthorized"));
            }, error => reject(error));
    });
}

_isUser = (vitabox, user) => {
    return new Promise((resolve, reject) => {
        vitabox.hasUser(user).then(
            success => {
                if (success) resolve();
                else reject(new Error("Unauthorized"));
            }, error => reject(error));
    });
}