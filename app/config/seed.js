var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
    return new Promise((resolve, reject) => {


        db.User.count({ where: { admin: true } }).then(
            count => {
                if (count < 1) {
                    utils.encrypt(["admin@a.aa", "user1@a.aa", "user2@a.aa", "123qweASD", "passvita"])
                        .then(
                            encrypted => {

                                db.User.bulkCreate([
                                    { "email": encrypted[0], "admin": true, "password": encrypted[3] },
                                    { "email": encrypted[1], "password": encrypted[3] },
                                    { "email": encrypted[2], "password": encrypted[3] }
                                ]).then(
                                    users => db.Vitabox.create({ "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Av. Dr. Aurélio Ribeiro 3, Tomar, Portugal", "registered": true, "active": true, "password": encrypted[4] }).then(
                                        vitabox => vitabox.addUsers([users[1].id, users[2].id]).then(
                                            () => db.Boardmodel.bulkCreate([
                                                { "name": "Zolertia RE-Mote", "type": "environmental" },
                                                { "name": "Xiaomi MI Band", "type": "wearable" },
                                                { "name": "MySignals", "type": "non-wearable" }
                                            ]).then(
                                                board_models => db.Board.bulkCreate([
                                                    { "vitabox_id": vitabox.id, "boardmodel_id": board_models[0].id, "location": "kitchen" },
                                                    { "vitabox_id": vitabox.id, "boardmodel_id": board_models[1].id },
                                                    { "vitabox_id": vitabox.id, "boardmodel_id": board_models[2].id, "location": "bedroom" }
                                                ]).then(
                                                    () => db.Sensor.bulkCreate([
                                                        { "transducer": "dht22", "measure": "temperature", "min_acceptable": "10", "max_acceptable": "25", "min_possible": "-20", "max_possible": "50" },
                                                        { "transducer": "dht22", "measure": "humidity", "min_acceptable": "30", "max_acceptable": "50", "min_possible": "20", "max_possible": "60" },
                                                        { "transducer": "mq-7", "measure": "carbon_monoxide", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" }
                                                    ]).then(
                                                        sensors => board_models[0].addSensors([sensors[0].id, sensors[1].id]).then(
                                                            () => resolve(),
                                                            error => reject(error)),
                                                        error => reject(error)),
                                                    error => reject(error)),
                                                error => reject(error)),
                                            error => reject(error)),
                                        error => reject(error)),
                                    error => reject(error));
                            }, error => reject(error));
                } else resolve();
            }, error => reject(error));
    });

}