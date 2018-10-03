var broker = require("./broker");

exports.log = (user_id, msg) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'log',                                                     // queue name
      new Buffer(JSON.stringify({ user: user_id, msg: msg })),    // data
      { persistent: true }                                        // options
    );
    resolve();
  });
}

exports.update = (vitabox_id) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().publish( vitabox_id, '', new Buffer(JSON.stringify("update")));
    resolve();
  });
}