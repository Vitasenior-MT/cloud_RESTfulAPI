var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
  return new Promise((resolve, reject) => {

    db.User.count({ where: { admin: true } }).then(
      count => {
        if (count < 1) if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "docker") // DEVELOPMENT ENV 
        {
          // console.log("will seed");
          let encrypted = utils.encrypt(["admin@a.aa", "jose@a.aa", "doctor@a.aa", "123qweASD", "passvita", "José António", "Administrator Exemple", "Doctor Exemple", "santarem", "tomar", "39.6003075+-8.3906627", "Rua teste"])
          if (!encrypted.error) {
            db.User.bulkCreate([
              { "email": encrypted.value[0], "admin": true, "password": encrypted.value[3], "name": encrypted.value[6] },
              { "email": encrypted.value[1], "password": encrypted.value[3], "name": encrypted.value[5] },
              { "email": encrypted.value[2], "doctor": true, "password": encrypted.value[3], "name": encrypted.value[7] }
            ]).then(
              users => db.Vitabox.bulkCreate([
                { "coordinates": encrypted.value[10], "address": encrypted.value[11], "registered": true, "active": true, "password": encrypted.value[4], district: encrypted.value[8], locality: encrypted.value[9] },
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
                      { "transducer": "dht22", "measure": "temperatura", "to_read": "temperatura", "unit": "ºC", "tag": "temp", "min_acceptable": "10", "max_acceptable": "28", "min_possible": "-20", "max_possible": "50", "min_graph": "-10", "max_graph": "40" },
                      { "transducer": "dht22", "measure": "humidade", "to_read": "humidade", "unit": "%", "tag": "humi", "min_acceptable": "30", "max_acceptable": "60", "min_possible": "20", "max_possible": "70", "min_graph": "10", "max_graph": "70" },
                      { "transducer": "medidor", "measure": "CO", "to_read": "monóxido de carbono", "unit": "ppm", "tag": "mono", "min_acceptable": "0", "max_acceptable": "9", "min_possible": "-1", "max_possible": "500", "min_graph": "0", "max_graph": "12" },
                      { "transducer": "medidor", "measure": "oximetria", "to_read": "oximetria de pulso", "unit": "%", "tag": "spo2", "min_acceptable": "90", "max_acceptable": "100", "min_possible": "0", "max_possible": "200", "min_graph": "85", "max_graph": "105" },
                      { "transducer": "medidor", "measure": "pulsação", "to_read": "pulsação arterial", "unit": "bpm", "tag": "pulse", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400", "min_graph": "40", "max_graph": "110" },
                      { "transducer": "medidor", "measure": "p.a. diastólica", "to_read": "pressão arterial diastólica", "unit": "mmHg", "tag": "diastolic", "min_acceptable": "0", "max_acceptable": "90", "min_possible": "-1", "max_possible": "300", "min_graph": "0", "max_graph": "100" },
                      { "transducer": "medidor", "measure": "p.a. sistólica", "to_read": "pressão arterial sistólica", "unit": "mmHg", "tag": "systolic", "min_acceptable": "0", "max_acceptable": "150", "min_possible": "-1", "max_possible": "300", "min_graph": "0", "max_graph": "160" },
                      { "transducer": "medidor", "measure": "peso", "to_read": "peso", "tag": "weight", "unit": "Kg", "min_acceptable": "45", "max_acceptable": "120", "min_possible": "0", "max_possible": "300", "min_graph": "30", "max_graph": "130" },
                      { "transducer": "medidor", "measure": "passos", "to_read": "passos", "tag": "steps", "min_acceptable": "0", "max_acceptable": "99999", "min_possible": "-1", "max_possible": "99999", "min_graph": "0", "max_graph": "100" },
                      { "transducer": "medidor", "measure": "freq. cardíaca", "to_read": "frequênca cardíaca", "unit": "bpm", "tag": "heartrate", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400", "min_graph": "40", "max_graph": "110" },
                      { "transducer": "medidor", "measure": "temperatura corp.", "to_read": "temperatura corporal", "unit": "ºC", "tag": "bodytemp", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0", "min_graph": "0", "max_graph": "0" },
                      { "transducer": "medidor", "measure": "CO2", "to_read": "dióxido de carbono", "unit": "ppm", "tag": "diox", "min_acceptable": "0", "max_acceptable": "1250", "min_possible": "-1", "max_possible": "2000", "min_graph": "0", "max_graph": "1400" },
                      { "transducer": "medidor", "measure": "glucose", "to_read": "glucose", "unit": "mmol/L", "tag": "bloodglucose", "min_acceptable": "0", "max_acceptable": "8", "min_possible": "-1", "max_possible": "300", "min_graph": "0", "max_graph": "10" }
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
                  error => reject(error)),
                error => reject(error)),
              error => reject(error));
          } else reject(encrypted.error);
        }
        else // PRODUCTION ENV
        {
          let encrypted = utils.encrypt(["admin@a.aa", "123qweASD", "Administrator"])
          if (!encrypted.error) {
            db.User.create(
              { "email": encrypted.value[0], "admin": true, "password": encrypted.value[1], "name": encrypted.value[2] }
            ).then(
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
                  { "transducer": "dht22", "measure": "temperatura", "to_read": "temperatura", "unit": "ºC", "tag": "temp", "min_acceptable": "10", "max_acceptable": "28", "min_possible": "-20", "max_possible": "50", "min_graph": "-10", "max_graph": "40" },
                  { "transducer": "dht22", "measure": "humidade", "to_read": "humidade", "unit": "%", "tag": "humi", "min_acceptable": "30", "max_acceptable": "60", "min_possible": "20", "max_possible": "70", "min_graph": "10", "max_graph": "70" },
                  { "transducer": "medidor", "measure": "CO", "to_read": "monóxido de carbono", "unit": "ppm", "tag": "mono", "min_acceptable": "0", "max_acceptable": "9", "min_possible": "-1", "max_possible": "500", "min_graph": "0", "max_graph": "12" },
                  { "transducer": "medidor", "measure": "oximetria", "to_read": "oximetria de pulso", "unit": "%", "tag": "spo2", "min_acceptable": "90", "max_acceptable": "100", "min_possible": "0", "max_possible": "200", "min_graph": "85", "max_graph": "105" },
                  { "transducer": "medidor", "measure": "pulsação", "to_read": "pulsação arterial", "unit": "bpm", "tag": "pulse", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400", "min_graph": "40", "max_graph": "110" },
                  { "transducer": "medidor", "measure": "p.a. diastólica", "to_read": "pressão arterial diastólica", "unit": "mmHg", "tag": "diastolic", "min_acceptable": "0", "max_acceptable": "90", "min_possible": "-1", "max_possible": "300", "min_graph": "0", "max_graph": "100" },
                  { "transducer": "medidor", "measure": "p.a. sistólica", "to_read": "pressão arterial sistólica", "unit": "mmHg", "tag": "systolic", "min_acceptable": "0", "max_acceptable": "150", "min_possible": "-1", "max_possible": "300", "min_graph": "0", "max_graph": "160" },
                  { "transducer": "medidor", "measure": "peso", "to_read": "peso", "tag": "weight", "unit": "Kg", "min_acceptable": "45", "max_acceptable": "120", "min_possible": "0", "max_possible": "300", "min_graph": "30", "max_graph": "130" },
                  { "transducer": "medidor", "measure": "passos", "to_read": "passos", "tag": "steps", "min_acceptable": "0", "max_acceptable": "99999", "min_possible": "-1", "max_possible": "99999", "min_graph": "0", "max_graph": "100" },
                  { "transducer": "medidor", "measure": "freq. cardíaca", "to_read": "frequênca cardíaca", "unit": "bpm", "tag": "heartrate", "min_acceptable": "50", "max_acceptable": "100", "min_possible": "0", "max_possible": "400", "min_graph": "40", "max_graph": "110" },
                  { "transducer": "medidor", "measure": "temperatura corp.", "to_read": "temperatura corporal", "unit": "ºC", "tag": "bodytemp", "min_acceptable": "0", "max_acceptable": "0", "min_possible": "0", "max_possible": "0", "min_graph": "0", "max_graph": "0" },
                  { "transducer": "medidor", "measure": "CO2", "to_read": "dióxido de carbono", "unit": "ppm", "tag": "diox", "min_acceptable": "0", "max_acceptable": "1250", "min_possible": "-1", "max_possible": "2000", "min_graph": "0", "max_graph": "1400" },
                  { "transducer": "medidor", "measure": "glucose", "to_read": "glucose", "unit": "mmol/L", "tag": "bloodglucose", "min_acceptable": "0", "max_acceptable": "8", "min_possible": "-1", "max_possible": "300", "min_graph": "0", "max_graph": "10" },
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