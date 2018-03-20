var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
  return new Promise((resolve, reject) => {


    db.User.count({ where: { admin: true } }).then(
      count => {
        if (count < 1) {
          utils.encrypt(["admin@a.aa", "user1@a.aa", "user2@a.aa", "123qweASD", "passvita", "José António", "Manuela Antonieta"])
            .then(
              encrypted => {

                db.User.bulkCreate([
                  { "email": encrypted[0], "admin": true, "password": encrypted[3] },
                  { "email": encrypted[1], "password": encrypted[3] },
                  { "email": encrypted[2], "password": encrypted[3] }
                ]).then(
                  users => db.Vitabox.bulkCreate([
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Av. Dr. Aurélio Ribeiro 3, Tomar, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Largo S.Sebastião, 4G, 2drt, Torres Novas, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Rua Principal, nº23, Ourém, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Av. Dr. Aurélio Ribeiro 3, Tomar, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Largo Dr.Agostinho, 6A, 1drt, Torres Novas, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Rua Padre Luis, nº23, Freixianda, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Av. General Ramalho António, 72, Ansião, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Largo S.Sebastião, 4G, 2drt, Torres Novas, Portugal", "registered": true, "active": true, "password": encrypted[4] },
                    { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Rua Principal, nº23, Ourém, Portugal", "registered": true, "active": true, "password": encrypted[4] }
                  ]).then(
                    vitabox => vitabox[0].addUsers([users[1].id, users[2].id]).then(
                      () => db.Boardmodel.bulkCreate([
                        { "name": "Zolertia RE-Mote", "type": "environmental" },
                        { "name": "Xiaomi MI Band", "type": "wearable" },
                        { "name": "MySignals", "type": "non-wearable" }
                      ]).then(
                        board_models => db.Board.bulkCreate([
                          { "vitabox_id": vitabox[0].id, "boardmodel_id": board_models[0].id, "location": "kitchen", "mac_addr": "00:12:4b:00:06:0d:60:c8", "node_id": "60c8", password: encrypted[4], active: true },
                          { "vitabox_id": vitabox[0].id, "boardmodel_id": board_models[1].id, "mac_addr": "00:12:4b:00:06:0d:b2:1a", "node_id": "b21a", password: encrypted[4], active: true },
                          { "vitabox_id": vitabox[0].id, "boardmodel_id": board_models[2].id, "location": "bedroom", "mac_addr": "00:12:4b:00:06:0d:60:fb", "node_id": "60fb", password: encrypted[4], active: true }
                        ]).then(
                          boards => db.Sensor.bulkCreate([
                            { "transducer": "dht22", "measure": "temperature", "min_acceptable": "10", "max_acceptable": "25", "min_possible": "-20", "max_possible": "50" },
                            { "transducer": "dht22", "measure": "humidity", "min_acceptable": "30", "max_acceptable": "50", "min_possible": "20", "max_possible": "60" },
                            { "transducer": "mq-7", "measure": "carbon_monoxide", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" }
                          ]).then(
                            sensors => board_models[0].addSensors([sensors[0].id, sensors[1].id]).then(
                              () => db.Record.insertMany([
                                { value: "20", datetime: "2018-03-08T09:43:40.000Z", board_id: boards[0].id, sensor_id: sensors[0].id },
                                { value: "22", datetime: "2018-03-08T09:47:28.000Z", board_id: boards[0].id, sensor_id: sensors[0].id },
                                { value: "19", datetime: "2018-03-08T09:53:47.000Z", board_id: boards[0].id, sensor_id: sensors[0].id }
                              ], (error, doc) => {
                                if (error) reject(error);
                                else db.Patient.bulkCreate([
                                  { "name": encrypted[5], "birthdate": "1987-02-28", "gender": "male" },
                                  { "name": encrypted[6], "birthdate": "1972-02-28", "gender": "female" }
                                ]).then(
                                  patients => vitabox[0].addPatients(patients).then(
                                    () => resolve(),
                                    error => reject(error)),
                                  error => reject(error));
                              }),
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

module.exports.testSeed = (db) => {
  return new Promise((resolve, reject) => {

    utils.encrypt(["admin@a.aa", "123qweASD"])
      .then(
        encrypted => {

          db.User.create({ "email": encrypted[0], "admin": true, "password": encrypted[1] }).then(
            () => resolve(),
            error => reject(error));
        }, error => reject(error));
  });
}