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
    broker.subscribeToEntity(vitabox_id).then(
      () => {
        broker.getChannel().publish(vitabox_id, 'unicast', new Buffer(JSON.stringify({ content: "update", msg: "" })));
        resolve();
      }, error => reject(error));
  });
}