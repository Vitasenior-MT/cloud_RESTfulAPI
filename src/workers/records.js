var broker = require("./index");

exports.send = (records) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'records',                                        // queue name
      new Buffer(JSON.stringify({ records: records })), // data
      { persistent: true }                              // options
    );
    resolve();
  });
}