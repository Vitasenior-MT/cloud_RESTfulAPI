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
            let seed = null;
            if (process.env.NODE_ENV === "development") seed = require('./app/models/seed').seed(db);
            else seed = require('./app/models/seed').testSeed(db);
            seed.then(
                () => {
                    console.log('\x1b[32m%s\x1b[0m.', '(PLAIN) Connection established with MongoDB and MySQL');

                    let workers = [];
                    for (var i = 0; i < require('os').cpus().length; i++) workers.push(cluster.fork());
                    console.log('(PLAIN) Master cluster created ' + workers.length + ' workers...');

                    cluster.on('exit', (worker, code, signal) => { console.log('(PLAIN) Worker ' + worker.process.pid + ' died -> Starting a new worker'); cluster.fork(); });
                }, error => { console.log('Unable to seed Databases.', error.message); process.exit(1); })
        }, error => { console.log('Unable to connect to Databases.', error); process.exit(1); });
} else {
    var express = require('express'),
        path = require('path');
    // START THE SERVER
    // =============================================================================
    // define our app using express
    var app = express();
    // middleware for all routes
    require('./app/middleware')(app);
    // Present SPA
    app.use('/', express.static(path.resolve(__dirname, 'public')));
    // Present Documentation
    app.use('/docs', express.static(path.resolve(__dirname, 'docs')));
    // define routes
    require('./app/router')(app);
    //initialize a simple http server
    const server = require('http').createServer();
    // start http server
    server.on('request', app);
    // Define the listenning port
    var port = process.env.PORT || 8080;
    server.listen(port, () => {
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