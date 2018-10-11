var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
  return new Promise((resolve, reject) => {

    db.User.count({ where: { admin: true } }).then(
      count => {
        if (count < 1) if (process.env.NODE_ENV !== "production") // DEVELOPMENT ENV 
        {
          // console.log("will seed");
          let encrypted = utils.encrypt(["admin@a.aa", "jose@a.aa", "doctor@a.aa", "123qweASD", "passvita", "José António", "Administrator Exemple", "Doctor Exemple", "santarem", "tomar"])
          if (!encrypted.error) {
            db.User.bulkCreate([
              { "email": encrypted.value[0], "admin": true, "password": encrypted.value[3], "name": encrypted.value[6] },
              { "email": encrypted.value[1], "password": encrypted.value[3], "name": encrypted.value[5] },
              { "email": encrypted.value[2], "doctor": true, "password": encrypted.value[3], "name": encrypted.value[7] }
            ]).then(
              users => db.Vitabox.bulkCreate([
                { "latitude": "39.6003075", "longitude": "-8.3906627", "address": "f9bbee048f63bde52792a1ce009d0951ae52c1bc8033cfd5fbce839607f7f88c72e0e08fd4b363ac6dc2ef24185565a6", "registered": true, "active": true, "password": encrypted.value[4], district: encrypted.value[8], locality: encrypted.value[9] },
              ]).then(
                vitaboxes => vitaboxes[0].addUser(users[1].id, { through: { sponsor: true } }).then(
                  () => db.Boardmodel.bulkCreate([
                    { "name": "Zolertia RE-Mote", "type": "environmental", "tag": "zolertiaremote" },
                    { "name": "Bracelete", "type": "wearable", "tag": "bandfitness" },
                    { "name": "Pressão Arterial", "type": "non-wearable", "tag": "bloodpressure" },
                    { "name": "Pulsometro", "type": "non-wearable", "tag": "bodypulse" },
                    { "name": "Balança", "type": "non-wearable", "tag": "bodyscale" },
                    { "name": "Temperatura", "type": "non-wearable", "tag": "bodytemperature" },
                    { "name": "Glucose", "type": "non-wearable", "tag": "bloodglucose" }
                  ]).then(
                    board_models => db.Sensormodel.bulkCreate([
                      { "transducer": "dht22", "measure": "temperatura", "to_read": "temperatura", "unit": "ºC", "tag": "temp", "min_acceptable": "10", "max_acceptable": "28", "min_possible": "-20", "max_possible": "50", "last_commit": "2018-06-18T06:48:48.400Z", "deviation_range": 5, "last_values": [21, 23, 24, 22, 20] },
                      { "transducer": "dht22", "measure": "humidade", "to_read": "humidade", "unit": "%", "tag": "humi", "min_acceptable": "30", "max_acceptable": "60", "min_possible": "20", "max_possible": "70" },
                      { "transducer": "medidor", "measure": "CO", "to_read": "monóxido de carbono", "unit": "ppm", "tag": "mono", "min_acceptable": "0", "max_acceptable": "9", "min_possible": "-1", "max_possible": "500" },
                      { "transducer": "medidor", "measure": "oximetria", "to_read": "oximetria de pulso", "unit": "%", "tag": "spo2", "min_acceptable": "90", "max_acceptable": "100", "min_possible": "0", "max_possible": "200" },
                      { "transducer": "medidor", "measure": "pulsação", "to_read": "pulsação arterial", "unit": "bpm", "tag": "pulse", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400" },
                      { "transducer": "medidor", "measure": "p.a. diastólica", "to_read": "pressão arterial diastólica", "unit": "mmHg", "tag": "diastolic", "min_acceptable": "0", "max_acceptable": "90", "min_possible": "0", "max_possible": "300" },
                      { "transducer": "medidor", "measure": "p.a. sistólica", "to_read": "pressão arterial sistólica", "unit": "mmHg", "tag": "systolic", "min_acceptable": "0", "max_acceptable": "150", "min_possible": "0", "max_possible": "300" },
                      { "transducer": "medidor", "measure": "peso", "to_read": "peso", "tag": "weight", "unit": "Kg", "min_acceptable": "45", "max_acceptable": "120", "min_possible": "0", "max_possible": "300" },
                      { "transducer": "medidor", "measure": "passos", "to_read": "passos", "tag": "steps", "min_acceptable": "0", "max_acceptable": "99999", "min_possible": "-1", "max_possible": "99999" },
                      { "transducer": "medidor", "measure": "freq. cardíaca", "to_read": "frequênca cardíaca", "unit": "bpm", "tag": "heartrate", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400" },
                      { "transducer": "medidor", "measure": "temperatura corp.", "to_read": "temperatura corporal", "unit": "ºC", "tag": "bodytemp", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                      { "transducer": "medidor", "measure": "CO2", "to_read": "dióxido de carbono", "unit": "ppm", "tag": "diox", "min_acceptable": "0", "max_acceptable": "1250", "min_possible": "-1", "max_possible": "2000" },
                      { "transducer": "medidor", "measure": "glucose", "to_read": "glucose", "unit": "mmol/L", "tag": "glucose", "min_acceptable": "0", "max_acceptable": "8", "min_possible": "-1", "max_possible": "300" },
                    ]).then(
                      sensor_models => board_models[0].addSensormodels([sensor_models[0].id, sensor_models[1].id, sensor_models[2].id, sensor_models[11].id]).then(
                        () => board_models[1].addSensormodels([sensor_models[8].id, sensor_models[9].id]).then(
                          () => board_models[2].addSensormodels([sensor_models[4].id, sensor_models[5].id, sensor_models[6].id]).then(
                            () => board_models[3].addSensormodels([sensor_models[3].id, sensor_models[4].id]).then(
                              () => board_models[4].addSensormodel(sensor_models[7].id).then(
                                () => board_models[5].addSensormodel(sensor_models[10].id).then(
                                  () => board_models[6].addSensormodel(sensor_models[12].id).then(
                                    () => db.Board.bulkCreate([
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Sala", "mac_addr": "00:12:4b:00:06:0d:60:fd", "node_id": "60fd", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Quarto", "mac_addr": "00:12:4b:00:14:d5:2b:dd", "node_id": "2bdd", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[4].id, "mac_addr": "8c:de:52:97:b0:9b", "node_id": "b09b", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[2].id, "mac_addr": "50:8c:b1:66:64:80", "node_id": "6480", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[5].id, "mac_addr": "a8:1b:6a:a8:f8:4d", "node_id": "f84d", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[3].id, "mac_addr": "00:a0:50:04:13:1e", "node_id": "131e", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[1].id, "description": "Miband do Mario", "mac_addr": "cd:8d:c0:93:b4:26", "node_id": "b426", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Cozinha test", "mac_addr": "00:12:4b:00:18:d6:f7:a8", "node_id": "f7a8", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Sala test", "mac_addr": "00:12:4b:00:18:d6:f8:cc", "node_id": "f8cc", password: encrypted.value[4], active: true },
                                      { "vitabox_id": vitaboxes[0].id, "boardmodel_id": board_models[0].id, "description": "Quarto test", "mac_addr": "00:12:4b:00:18:d6:f8:88", "node_id": "f888", password: encrypted.value[4], active: true },
                                    ]).then(
                                      boards => db.Sensor.bulkCreate([
                                        { "board_id": boards[0].id, sensormodel_id: sensor_models[0].id },
                                        { "board_id": boards[0].id, sensormodel_id: sensor_models[1].id },
                                        { "board_id": boards[0].id, sensormodel_id: sensor_models[2].id },
                                        { "board_id": boards[0].id, sensormodel_id: sensor_models[11].id },
                                        { "board_id": boards[1].id, sensormodel_id: sensor_models[0].id },
                                        { "board_id": boards[1].id, sensormodel_id: sensor_models[1].id },
                                        { "board_id": boards[1].id, sensormodel_id: sensor_models[2].id },
                                        { "board_id": boards[1].id, sensormodel_id: sensor_models[11].id },
                                        { "board_id": boards[2].id, sensormodel_id: sensor_models[7].id },
                                        { "board_id": boards[3].id, sensormodel_id: sensor_models[4].id },
                                        { "board_id": boards[3].id, sensormodel_id: sensor_models[5].id },
                                        { "board_id": boards[3].id, sensormodel_id: sensor_models[6].id },
                                        { "board_id": boards[4].id, sensormodel_id: sensor_models[10].id },
                                        { "board_id": boards[5].id, sensormodel_id: sensor_models[3].id },
                                        { "board_id": boards[5].id, sensormodel_id: sensor_models[4].id },
                                        { "board_id": boards[6].id, sensormodel_id: sensor_models[8].id },
                                        { "board_id": boards[6].id, sensormodel_id: sensor_models[9].id },
                                        { "board_id": boards[7].id, sensormodel_id: sensor_models[0].id },
                                        { "board_id": boards[7].id, sensormodel_id: sensor_models[1].id },
                                        { "board_id": boards[7].id, sensormodel_id: sensor_models[2].id },
                                        { "board_id": boards[7].id, sensormodel_id: sensor_models[11].id },
                                        { "board_id": boards[8].id, sensormodel_id: sensor_models[0].id },
                                        { "board_id": boards[8].id, sensormodel_id: sensor_models[1].id },
                                        { "board_id": boards[8].id, sensormodel_id: sensor_models[2].id },
                                        { "board_id": boards[8].id, sensormodel_id: sensor_models[11].id },
                                        { "board_id": boards[9].id, sensormodel_id: sensor_models[0].id },
                                        { "board_id": boards[9].id, sensormodel_id: sensor_models[1].id },
                                        { "board_id": boards[9].id, sensormodel_id: sensor_models[2].id },
                                        { "board_id": boards[9].id, sensormodel_id: sensor_models[11].id },
                                      ]).then(
                                        sensors => db.Patient.bulkCreate([
                                          { "name": encrypted.value[5], "birthdate": "1987-02-28", "gender": "male", active: true, height: 1.73, weight: 78.4, cc: "ff89dbb0f03586c95d07dbcc51836b46", nif: "b48e5c5ce327580238c99916d026c1e2" }
                                        ]).then(
                                          patients => vitaboxes[0].addPatients(patients).then(
                                            patients[0].addDoctor(users[2].id).then(
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
                  error => reject(error)),
                error => reject(error)),
              error => reject(error));
          } else reject(encrypted.error);
        }
        else // PRODUCTION ENV
        {
          let encrypted = utils.encrypt(["admin@a.aa", "jose@a.aa", "doctor@a.aa", "123qweASD", "José António", "Administrator", "Doctor"])
          if (!encrypted.error) {
            db.User.bulkCreate([
              { "email": encrypted.value[0], "admin": true, "password": encrypted.value[3], "name": encrypted.value[5] },
              { "email": encrypted.value[1], "password": encrypted.value[3], "name": encrypted.value[4] },
              { "email": encrypted.value[2], "doctor": true, "password": encrypted.value[3], "name": encrypted.value[6] }
            ]).then(
              () => db.Boardmodel.bulkCreate([
                { "name": "Zolertia RE-Mote", "type": "environmental", "tag": "zolertiaremote" },
                { "name": "Bracelete", "type": "wearable", "tag": "bandfitness" },
                { "name": "Pressão Arterial", "type": "non-wearable", "tag": "bloodpressure" },
                { "name": "Pulsometro", "type": "non-wearable", "tag": "bodypulse" },
                { "name": "Balança", "type": "non-wearable", "tag": "bodyscale" },
                { "name": "Temperatura", "type": "non-wearable", "tag": "bodytemperature" },
                { "name": "Glucose", "type": "non-wearable", "tag": "bloodglucose" }
              ]).then(
                board_models => db.Sensormodel.bulkCreate([
                  { "transducer": "dht22", "measure": "temperatura", "to_read": "temperatura", "unit": "ºC", "tag": "temp", "min_acceptable": "10", "max_acceptable": "28", "min_possible": "-20", "max_possible": "50", "last_commit": "2018-06-18T06:48:48.400Z", "deviation_range": 5, "last_values": [21, 23, 24, 22, 20] },
                  { "transducer": "dht22", "measure": "humidade", "to_read": "humidade", "unit": "%", "tag": "humi", "min_acceptable": "30", "max_acceptable": "60", "min_possible": "20", "max_possible": "70" },
                  { "transducer": "medidor", "measure": "CO", "to_read": "monóxido de carbono", "unit": "ppm", "tag": "mono", "min_acceptable": "0", "max_acceptable": "9", "min_possible": "-1", "max_possible": "500" },
                  { "transducer": "medidor", "measure": "oximetria", "to_read": "oximetria de pulso", "unit": "%", "tag": "spo2", "min_acceptable": "90", "max_acceptable": "100", "min_possible": "0", "max_possible": "200" },
                  { "transducer": "medidor", "measure": "pulsação", "to_read": "pulsação arterial", "unit": "bpm", "tag": "pulse", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400" },
                  { "transducer": "medidor", "measure": "p.a. diastólica", "to_read": "pressão arterial diastólica", "unit": "mmHg", "tag": "diastolic", "min_acceptable": "0", "max_acceptable": "90", "min_possible": "0", "max_possible": "300" },
                  { "transducer": "medidor", "measure": "p.a. sistólica", "to_read": "pressão arterial sistólica", "unit": "mmHg", "tag": "systolic", "min_acceptable": "0", "max_acceptable": "150", "min_possible": "0", "max_possible": "300" },
                  { "transducer": "medidor", "measure": "peso", "to_read": "peso", "tag": "weight", "unit": "Kg", "min_acceptable": "45", "max_acceptable": "120", "min_possible": "0", "max_possible": "300" },
                  { "transducer": "medidor", "measure": "passos", "to_read": "passos", "tag": "steps", "min_acceptable": "0", "max_acceptable": "99999", "min_possible": "-1", "max_possible": "99999" },
                  { "transducer": "medidor", "measure": "freq. cardíaca", "to_read": "frequênca cardíaca", "unit": "bpm", "tag": "heartrate", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400" },
                  { "transducer": "medidor", "measure": "temperatura corp.", "to_read": "temperatura corporal", "unit": "ºC", "tag": "bodytemp", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0" },
                  { "transducer": "medidor", "measure": "CO2", "to_read": "dióxido de carbono", "unit": "ppm", "tag": "diox", "min_acceptable": "0", "max_acceptable": "1250", "min_possible": "-1", "max_possible": "2000" },
                  { "transducer": "medidor", "measure": "glucose", "to_read": "glucose", "unit": "mmol/L", "tag": "glucose", "min_acceptable": "0", "max_acceptable": "8", "min_possible": "-1", "max_possible": "300" },
                ]).then(
                  sensor_models => board_models[0].addSensormodels([sensor_models[0].id, sensor_models[1].id, sensor_models[2].id, sensor_models[11].id]).then(
                    () => board_models[1].addSensormodels([sensor_models[8].id, sensor_models[9].id]).then(
                      () => board_models[2].addSensormodels([sensor_models[4].id, sensor_models[5].id, sensor_models[6].id]).then(
                        () => board_models[3].addSensormodels([sensor_models[3].id, sensor_models[4].id]).then(
                          () => board_models[4].addSensormodel(sensor_models[7].id).then(
                            () => board_models[5].addSensormodel(sensor_models[10].id).then(
                              () => board_models[6].addSensormodel(sensor_models[12].id).then(
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
              error => reject(error));
          } else reject(encrypted.error);
        } else resolve();
      }, error => reject(error));
  });

}