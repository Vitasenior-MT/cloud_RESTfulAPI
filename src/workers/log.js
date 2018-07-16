var broker = require("./broker");

exports.send = (user_id, msg) => {
  return new Promise((resolve, reject) => {
    broker.getChannel().sendToQueue(
      'log',                                                     // queue name
      new Buffer(JSON.stringify({ user: user_id, msg: msg })),    // data
      { persistent: true }                                        // options
    );
    resolve();
  });
}