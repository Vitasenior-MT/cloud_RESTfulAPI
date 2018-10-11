var broker = require("./broker");

exports.connectToExchange = (id) => {
  return new Promise((resolve, reject) => {
    let channel = broker.getChannel();
    channel.assertExchange(id, 'fanout', { durable: true });
    //setup a queue for receiving messages
    channel.assertQueue('', { exclusive: true }, function (err, q) {
      if (err) reject(err);
      channel.bindQueue(q.queue, id, '');
      resolve();
    });
  });
}