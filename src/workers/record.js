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

exports.remove = (board_id) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'remove_record',                                    // queue name
      new Buffer(JSON.stringify({ board_id: board_id })), // data
      { persistent: true }                                // options
    );
    resolve();
  });
}