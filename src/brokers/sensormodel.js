var broker = require("./broker");

exports.add = (boardmodel_id, sensormodel) => {
    return new Promise((resolve, reject) => {
        broker.getChannel().sendToQueue(
            'add_sensormodel',                                                                              // queue name
            new Buffer(JSON.stringify({ boardmodel_id: boardmodel_id, sensormodel: sensormodel })),   // data
            { persistent: true }                                                                            // options
        );
        resolve();
    });
}

exports.remove = (boardmodel_id, sensormodel) => {
    return new Promise((resolve, reject) => {
        broker.getChannel().sendToQueue(
            'remove_sensormodel',                                                                           // queue name
            new Buffer(JSON.stringify({ boardmodel_id: boardmodel_id, sensormodel: sensormodel })),   // data
            { persistent: true }                                                                            // options
        );
        resolve();
    });
}