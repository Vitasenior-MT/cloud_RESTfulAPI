var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
  return new Promise((resolve, reject) => {

    db.User.count({ where: { admin: true } }).then(
      count => {
        if (count < 1) {
          if (process.env.NODE_ENV !== "test") // PRODUCTION and DEVELOPMENT ENV 
          {
            console.log("will seed");
            let encrypted = utils.encrypt(["admin@a.aa", "jose@a.aa", "user2@a.aa", "123qweASD", "passvita", "José António", "Administrator Exemple"])
            if (!encrypted.error) {
              db.User.bulkCreate([
                { "email": encrypted.value[0], "admin": true, "password": encrypted.value[3], "name": encrypted.value[6] },
                { "email": encrypted.value[1], "password": encrypted.value[3], "name": encrypted.value[5] }
              ]).then(
                users => db.Vitabox.bulkCreate([
                  { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "f9bbee048f63bde52792a1ce009d0951ae52c1bc8033cfd5fbce839607f7f88c72e0e08fd4b363ac6dc2ef24185565a6", "registered": true, "active": true, "password": encrypted.value[4] },
                  { "latitude": "38.8976763", "longitude": "-77.038718", "address": "fd33d9588fd76aab2a8f9e66704bf85df7756a6b415d08ef7e2425b11140e839570e61b624372b9f401b6036c018d5d8060a0dc540930dfe463f4ee29e111fd6", "registered": true, "active": true, "password": encrypted.value[4] }
                ]).then(
                  vitaboxes => vitaboxes[0].addUser(users[1].id, { through: { sponsor: true } }).then(
                    () => vitaboxes[1].addUser(users[1].id).then(
                      () => db.Boardmodel.bulkCreate([
                        { "name": "Zolertia RE-Mote", "type": "environmental", "tag": "zolertiaremote" },
                        { "name": "Bracelete", "type": "wearable", "tag": "bandfitness" },
                        { "name": "Pressão Arterial", "type": "non-wearable", "tag": "bloodpressure" },
                        { "name": "Pulsometro", "type": "non-wearable", "tag": "bodypulse" },
                        { "name": "Balança", "type": "non-wearable", "tag": "bodyscale" },
                        { "name": "Temperatura", "type": "non-wearable", "tag": "bodytemperature" }
                      ]).then(
                        board_models => db.Sensormodel.bulkCreate([
                          { "transducer": "dht22", "measure": "temperatura (ºC)", "tag": "temp", "min_acceptable": "10", "max_acceptable": "28", "min_possible": "-20", "max_possible": "50", "last_commit": "2018-06-18T06:48:48.400Z", "deviation_range": 5, "last_values": [21, 23, 24, 22, 20] },
                          { "transducer": "dht22", "measure": "humidade (%)", "tag": "humi", "min_acceptable": "30", "max_acceptable": "60", "min_possible": "20", "max_possible": "70" },
                          { "transducer": "medidor", "measure": "monox. carbono (ppm)", "tag": "mono", "min_acceptable": "0", "max_acceptable": "500", "min_possible": "-1", "max_possible": "600" },
                          { "transducer": "medidor", "measure": "oximetria de pulso (%)", "tag": "spo2", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                          { "transducer": "medidor", "measure": "puls. arterial (bpm)", "tag": "pulse", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                          { "transducer": "medidor", "measure": "tensão art. diastólica", "tag": "diastolic", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                          { "transducer": "medidor", "measure": "tensão art. sistólica", "tag": "systolic", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                          { "transducer": "medidor", "measure": "peso (Kg)", "tag": "weight", "min_acceptable": "2", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                          { "transducer": "medidor", "measure": "passos", "tag": "steps", "min_acceptable": "2", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                          { "transducer": "medidor", "measure": "freq. cardíaca", "tag": "heartrate", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" }
                        ]).then(
                          sensor_models => board_models[0].addSensormodels([sensor_models[0].id, sensor_models[1].id, sensor_models[2].id]).then(
                            () => board_models[1].addSensormodels([sensor_models[8].id, sensor_models[9].id]).then(
                              () => board_models[2].addSensormodels([sensor_models[4].id, sensor_models[5].id, sensor_models[6].id]).then(
                                () => board_models[3].addSensormodels([sensor_models[3].id, sensor_models[4].id]).then(
                                  () => board_models[4].addSensormodel(sensor_models[7].id).then(
                                    () => db.Board.bulkCreate([
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[1].id, "description": "Miband do José", "mac_addr": "fe:96:38:0c:74:79", "node_id": "7479", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[2].id, "mac_addr": "50:8c:b1:6b:17:4f", "node_id": "174f", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[3].id, "mac_addr": "00:a0:50:04:26:2e", "node_id": "262e", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[4].id, "mac_addr": "8c:de:52:97:c0:34", "node_id": "c034", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Cozinha", "mac_addr": "00:12:4b:00:06:0d:60:c8", "node_id": "60c8", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Sala", "mac_addr": "00:12:4b:00:06:0d:b2:1a", "node_id": "b21a", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[1].id, "boardmodel_id": board_models[0].id, "description": "Quarto", "mac_addr": "00:12:4b:00:06:0d:d9:99", "node_id": "d999", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Quarto", "mac_addr": "00:12:4b:00:06:0d:2f:26", "node_id": "2f26", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[5].id, "mac_addr": "8c:de:52:97:c0:35", "node_id": "c035", password: encrypted.value[4], active: true },
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
                                        { "board_id": boards[7].id, sensormodel_id: sensor_models[0].id },
                                        { "board_id": boards[7].id, sensormodel_id: sensor_models[1].id },
                                        { "board_id": boards[7].id, sensormodel_id: sensor_models[2].id }
                                      ]).then(
                                        sensors => db.Patient.bulkCreate([
                                          { "name": encrypted.value[5], "birthdate": "1987-02-28", "gender": "male", active: true, height: 1.73, weight: 78.4 }
                                        ]).then(
                                          patients => vitaboxes[0].addPatients(patients).then(
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
                  error => reject(error)),
                error => reject(error));
            } else reject(encrypted.error);
          }
          else // TEST ENV
          {
            let encrypted = utils.encrypt(["admin@a.aa", "123qweASD", "Administrator", "user@a.aa", "User Example"]);
            if (!encrypted.error) {

              db.User.bulkCreate([
                { "email": encrypted.value[0], "admin": true, "password": encrypted.value[1], "name": encrypted.value[2] },
                { "email": encrypted.value[3], "password": encrypted.value[1], "name": encrypted.value[4] }
              ]).then(
                () => resolve(),
                error => reject(error));
            } else reject(encrypted.error);
          }
        } else resolve();
      }, error => reject(error));
  });

}