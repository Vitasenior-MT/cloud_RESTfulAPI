var broker = require("./broker");

exports.insert = (records) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'insert_record',                                  // queue name
      new Buffer(JSON.stringify({ records: records })), // data
      { persistent: true }                              // options
    );
    resolve();
  });
}

exports.removeByBoard = (board_id) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'remove_record_by_board',                           // queue name
      new Buffer(JSON.stringify({ board_id: board_id })), // data
      { persistent: true }                                // options
    );
    resolve();
  });
}

exports.removeByPatient = (patient_id) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'remove_record_by_patient',                             // queue name
      new Buffer(JSON.stringify({ patient_id: patient_id})),  // data
      { persistent: true }                                    // options
    );
    resolve();
  });
}

exports.removeBySensors = (sensor_ids) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'remove_record_by_sensors',                             // queue name
      new Buffer(JSON.stringify({ sensor_ids: sensor_ids })), // data
      { persistent: true }                                    // options
    );
    resolve();
  });
}

exports.removeByBoardPatient = (patient_id, board_id) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'remove_record_by_board_patient',                                           // queue name
      new Buffer(JSON.stringify({ patient_id: patient_id, board_id: board_id })), // data
      { persistent: true }                                                        // options
    );
    resolve();
  });
}

