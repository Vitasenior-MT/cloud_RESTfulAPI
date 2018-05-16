var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
  return new Promise((resolve, reject) => {
    db.User.count({ where: { admin: true } }).then(
      count => {
        if (count < 1) {
          console.log("will seed");
          let encrypted = utils.encrypt(["admin@a.aa", "jose@a.aa", "user2@a.aa", "123qweASD", "passvita", "José António", "Administrator Exemple"])
          if (!encrypted.error) {
            db.User.bulkCreate([
              { "email": encrypted.value[0], "admin": true, "password": encrypted.value[3], "name": encrypted.value[6] },
              { "email": encrypted.value[1], "password": encrypted.value[3], "name": encrypted.value[5] }
            ]).then(
              users => db.Vitabox.create({ "latitude": "39.6003075", "longitude": "-8.3906627", "address": "Av. Dr. Aurélio Ribeiro 3, Tomar, Portugal", "registered": true, "active": true, "password": encrypted.value[4] }).then(
                vitabox => vitabox.addUser(users[1].id).then(
                  () => db.Boardmodel.bulkCreate([
                    { "name": "Zolertia RE-Mote", "type": "environmental", "tag": "zolertiaremote" },
                    { "name": "Xiaomi MI Band", "type": "wearable", "tag": "bandfitness" },
                    { "name": "MySignals Blood Pressure", "type": "non-wearable", "tag": "bloodpressure" },
                    { "name": "MySignals body Pulse", "type": "non-wearable", "tag": "bodypulse" },
                    { "name": "MySignals Body Scale", "type": "non-wearable", "tag": "bodyscale" }
                  ]).then(
                    board_models => db.Sensormodel.bulkCreate([
                      { "transducer": "dht22", "measure": "temperature", "tag": "temp", "min_acceptable": "10", "max_acceptable": "25", "min_possible": "-20", "max_possible": "50", "last_commit": "2018-06-18T06:48:48.400Z", "deviation_range": 5, "last_values": [21, 23, 24, 22, 20] },
                      { "transducer": "dht22", "measure": "humidity", "tag": "humi", "min_acceptable": "30", "max_acceptable": "50", "min_possible": "20", "max_possible": "60" },
                      { "transducer": "mq-7", "measure": "monoxide carbon", "tag": "mono", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" },
                      { "transducer": "pulse oximetry", "measure": "pulse oximetry", "tag": "spo2", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" },
                      { "transducer": "pulse", "measure": "pulse", "tag": "pulse", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" },
                      { "transducer": "diastolic", "measure": "diastolic", "tag": "diastolic", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" },
                      { "transducer": "systolic", "measure": "systolic", "tag": "systolic", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" },
                      { "transducer": "weight", "measure": "weight", "tag": "weight", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" },
                      { "transducer": "steps", "measure": "steps", "tag": "steps", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" },
                      { "transducer": "heart rate", "measure": "heartrate", "tag": "heartrate", "min_acceptable": "2", "max_acceptable": "10", "min_possible": "10", "max_possible": "500" }
                    ]).then(
                      sensor_models => board_models[0].addSensormodels([sensor_models[0].id, sensor_models[1].id, sensor_models[2].id]).then(
                        () => board_models[1].addSensormodels([sensor_models[8].id, sensor_models[9].id]).then(
                          () => board_models[2].addSensormodels([sensor_models[4].id, sensor_models[5].id, sensor_models[6].id]).then(
                            () => board_models[3].addSensormodels([sensor_models[3].id, sensor_models[4].id]).then(
                              () => board_models[4].addSensormodel(sensor_models[7].id).then(
                                () => db.Board.bulkCreate([
                                  { "vitabox_id": vitabox.id, "boardmodel_id": board_models[1].id, "description":"Jose's miband", "mac_addr": "fe:96:38:0c:74:79", "node_id": "7479", password: encrypted.value[4], active: true },
                                  { "vitabox_id": vitabox.id, "boardmodel_id": board_models[2].id, "mac_addr": "50:8c:b1:6b:17:4f", "node_id": "174f", password: encrypted.value[4], active: true },
                                  { "vitabox_id": vitabox.id, "boardmodel_id": board_models[3].id, "mac_addr": "00:a0:50:04:26:2e", "node_id": "262e", password: encrypted.value[4], active: true },
                                  { "vitabox_id": vitabox.id, "boardmodel_id": board_models[4].id, "mac_addr": "8c:de:52:97:c0:34", "node_id": "c034", password: encrypted.value[4], active: true },
                                  { "vitabox_id": vitabox.id, "boardmodel_id": board_models[0].id, "description": "kitchen", "mac_addr": "00:12:4b:00:06:0d:60:c8", "node_id": "60c8", password: encrypted.value[4], active: true },
                                  { "vitabox_id": vitabox.id, "boardmodel_id": board_models[0].id, "description": "kitchen", "mac_addr": "00:12:4b:00:06:0d:b2:1a", "node_id": "b21a", password: encrypted.value[4], active: true },
                                  { "vitabox_id": vitabox.id, "boardmodel_id": board_models[0].id, "description": "bedroom", "mac_addr": "00:12:4b:00:06:0d:60:fb", "node_id": "60fb", password: encrypted.value[4], active: true }
                                ]).then(
                                  boards => db.Sensor.bulkCreate([
                                    { "board_id": boards[0].id, sensormodel_id: sensor_models[8].id },
                                    { "board_id": boards[0].id, sensormodel_id: sensor_models[9].id },
                                    { "board_id": boards[1].id, sensormodel_id: sensor_models[4].id },
                                    { "board_id": boards[1].id, sensormodel_id: sensor_models[5].id },
                                    { "board_id": boards[1].id, sensormodel_id: sensor_models[6].id },
                                    { "board_id": boards[2].id, sensormodel_id: sensor_models[3].id },
                                    { "board_id": boards[2].id, sensormodel_id: sensor_models[4].id },
                                    { "board_id": boards[3].id, sensormodel_id: sensor_models[7].id },
                                    { "board_id": boards[4].id, sensormodel_id: sensor_models[0].id },
                                    { "board_id": boards[4].id, sensormodel_id: sensor_models[1].id },
                                    { "board_id": boards[4].id, sensormodel_id: sensor_models[2].id },
                                    { "board_id": boards[5].id, sensormodel_id: sensor_models[0].id },
                                    { "board_id": boards[5].id, sensormodel_id: sensor_models[1].id },
                                    { "board_id": boards[5].id, sensormodel_id: sensor_models[2].id },
                                    { "board_id": boards[6].id, sensormodel_id: sensor_models[0].id },
                                    { "board_id": boards[6].id, sensormodel_id: sensor_models[1].id },
                                    { "board_id": boards[6].id, sensormodel_id: sensor_models[2].id },
                                  ]).then(
                                    sensors => db.Patient.bulkCreate([
                                      { "name": encrypted.value[5], "birthdate": "1987-02-28", "gender": "male", active: true, height: 1.73 }
                                    ]).then(
                                      patients => vitabox.addPatients(patients).then(
                                        () => resolve(),
                                        error => reject(error)),
                                      error => reject(error)),
                                    error => reject(error)),
                                  error => reject(error)),
                                error => reject(error)),
                              error => reject(error)),
                            error => reject(error)),
                          error => reject(error)),
                        error => reject(error)),
                      error => reject(error)),
                    error => reject(error)),
                  error => reject(error)),
                error => reject(error)),
              error => reject(error));
          } else reject(encrypted.error);
        } else resolve();
      }, error => reject(error));
  });

}

module.exports.testSeed = (db) => {
  return new Promise((resolve, reject) => {
    db.User.count({ where: { admin: true } }).then(
      count => {
        if (count < 1) {
          let encrypted = utils.encrypt(["admin@a.aa", "123qweASD", "Administrator", "user@a.aa", "User Example"]);
          if (!encrypted.error) {

            db.User.bulkCreate([
              { "email": encrypted.value[0], "admin": true, "password": encrypted.value[1], "name": encrypted.value[2] },
              { "email": encrypted.value[3], "password": encrypted.value[1], "name": encrypted.value[4] }
            ]).then(
              () => resolve(),
              error => reject(error));
          } else reject(encrypted.error);
        } else resolve();
      }, error => reject(error));
  });
}