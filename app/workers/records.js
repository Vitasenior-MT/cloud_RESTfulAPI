var db = require('../../models/index');

let sensors = [];

db.Sensor.findAll().then(res => sensors = res);

function mining() {
  db.RecordTemp.find().select("-_id").exec((error, records) => {
    if (error) return 0;
    if (records.length > 0) {

      records.forEach(record => {
        let sensor = sensors.find((element) => { return element.id === record.sensor_id; });

        sensor.update({ last_values: sensor.last_values.length > 5 ? [record.value].concat(sensor.last_values.slice(0, 4)) : [record.value].concat(sensor.last_values) }).then(
          () => {
            let avg = sensor.last_values.reduce((a, c) => a + c) / sensor.last_values.length;
            if (record.value > (avg + sensor.deviation_range) || record.value > (avg + sensor.deviation_range)) {
              log("The transducer " + sensor.transducer + " received an anormal value");
            }
          }, error => { return 0; });
      });
    } else return 2;
  });
  
}

function log(){
  db.log
}