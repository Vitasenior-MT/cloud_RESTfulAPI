// server.js

// BASE SETUP
// =============================================================================
var cluster = require('cluster');
// Get the env variables from .env
require('dotenv').config();

if (cluster.isMaster) {
    var db = require('./app/models/index');
    db.sequelize.sync().then(
        () => {
            require('./app/models/seed').seed(db).then(
                () => {
                    console.log('\x1b[32m%s\x1b[0m.', '(PLAIN) Connection established with MongoDB and MySQL');

                    var cpus = require('os').cpus().length
                    console.log('Master cluster setting up ' + cpus + ' workers...');

                    for (var i = 0; i < cpus; i++) {
                        cluster.fork();
                    }

                    cluster.on('exit', function (worker, code, signal) {
                        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal + '-> Starting a new worker');
                        cluster.fork();
                    });
                },
                error => {
                    console.log('Unable to seed Databases.');
                    console.log(error.message);
                    process.exit(1);
                }
            )
        },
        error => {
            console.log('Unable to connect to Databases.');
            console.log(error);
            process.exit(1);
        });
} else {
    // call the packages we need
    var express = require('express'),           // call express
        // https = require('https'),
        // fs = require("fs"),
        path = require('path'),
        router = require('./app/router'),
        middlware = require('./app/middleware');

    // START THE SERVER
    // =============================================================================
    // define our app using express
    var app = express();
    middlware(app);
    router(app);
    // Present SPA
    app.use('/', express.static(path.resolve(__dirname, 'public')));
    // Present Documentation
    app.use('/docs', express.static(path.resolve(__dirname, 'docs')));

    // Define the listenning port
    var port = process.env.PORT || 80;
    // start http server
    app.listen(port, () => {
        // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        console.log('\x1b[32m%s %d\x1b[0m.', '(PLAIN) Server http listening on port', port);
    });

    // var https = require('https'), fs = require("fs");
    // //set options to https
    // const options = {
    //     key: fs.readFileSync(__dirname + "/app/keys/key.pem"),
    //     cert: fs.readFileSync(__dirname + "/app/keys/cert.pem"),
    //     ca: fs.readFileSync(__dirname + "/app/keys/ca.pem"),
    //     dhparam: fs.readFileSync(__dirname + "/app/keys/dhparam.pem")
    // };
    // // start https server
    // https.createServer(options, app).listen(8080, () => {
    //     console.log('\x1b[32m%s %d\x1b[0m.', '(PLAIN) Server https listening on port', port);
    // });
}
