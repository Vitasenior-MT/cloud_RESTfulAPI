var amqp = require('amqplib/callback_api'),
  url = require('url');;

var channel, connection;

var queues = [
  "insert_record",
  "log",
  "remove_record_by_board",
  "remove_record_by_patient",
  "remove_record_by_sensors",
  "remove_record_by_board_patient"
];

exports.connectToBroker = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.AMQP, { servername: url.parse(process.env.AMQP).hostname }, (err, conn) => {
      if (err) reject(err);
      else conn.createChannel((err, ch) => {
        if (err) { conn.close(); reject(err); }

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

exports.subscribeToEntity = (entity_id) => {
  return new Promise((resolve, reject) => {
    channel.assertExchange(entity_id, 'direct', { autoDelete: true, durable: false }, function (err, ok) {
      if (err) reject(err);
      else resolve();
    });
  });
}