var amqp = require('amqplib/callback_api');

var uri = "";
if (process.env.NODE_ENV === "production") {
  uri = '<rabbit mq uri>';
} else {
  uri = 'amqp://root:123qwe@192.168.161.79:5672';
}

var queues = ["records"];

var channel, connection;

exports.connect = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(uri, (err, conn) => {
      if (err) { reject(err); }
      conn.createChannel((err, ch) => {
        if (err) {
          conn.close();
          reject(err);
        }
        connection = conn;
        channel = ch;

        queues.forEach(queue => channel.assertQueue(queue, { durable: true }));
        resolve();
      });

    });
  });
}

exports.getChannel = () => { return channel; }

exports.disconnect = () => {
  channel.close();
  connection.close();
}