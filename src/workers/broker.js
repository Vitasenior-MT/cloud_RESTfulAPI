var amqp = require('amqplib/callback_api'),
  url = require('url');;

var channel, connection;

var queues = [
  "insert_record",
  "remove_record",
  "log",
  "update",
  "remove_record_by_board",
  "remove_record_by_patient",
  "remove_record_by_sensors",
  "remove_record_by_board_patient"
];

exports.connect = () => {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.AMQP, { servername: url.parse(process.env.AMQP).hostname }, (err, conn) => {
      if (err) { reject(err); }
      conn.createChannel((err, ch) => {
        if (err) { conn.close(); reject(err); }

        connection = conn;
        channel = ch;

        queues.forEach(queue => channel.assertQueue(queue, { durable: true }));
        _connectToExchanges().then(
          () => resolve(),
          err => reject(err));
      });

    });
  });
}

exports.getChannel = () => { return channel; }

exports.disconnect = () => {
  channel.close();
  connection.close();
}

_connectToExchanges = () => {
  return new Promise((resolve, reject) => {
    require('../models/index').Vitabox.findAll().then(
      list => {
        let vitaboxes = list.map(x => x.id);
        vitaboxes.push("admin");
        Promise.all(vitaboxes.map(vitabox => _subscribeToVitabox(channel, vitabox))).then(
          () => resolve(channel),
          error => reject(error));
      }, error => reject({ code: 500, msg: error.message }));
  });
}

_subscribeToVitabox = (channel, vitabox) => {
  return new Promise((resolve, reject) => {
    channel.assertExchange(vitabox, 'fanout', { durable: true });
    //setup a queue for receiving messages
    channel.assertQueue('', { exclusive: true }, function (err, q) {
      if (err) reject(err);
      channel.bindQueue(q.queue, vitabox, '');
      resolve();
    });
  });
}