// apidoc -i docs/ -f .js -o docs/

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
        bodyParser = require('body-parser'),
        utils = require('./app/business/index').v1_0_0.utils;

    // START THE SERVER
    // =============================================================================
    // define our app using express
    var app = express();

    // middleware to use for all requests
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Version");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        res.header('Access-Control-Allow-Credentials', true);
        if (process.env.NODE_ENV === "development") console.log("\x1b[36m" + req.method, req.url + "\x1b[0m");
       
        if (req.method === "OPTIONS") {
            return res.send(200);
        } 
        if (req.headers && req.headers.authorization) {
            utils.validateToken(req.headers.authorization, req.connection.remoteAddress).then(
                client => {
                    if (client) {
                        req.client = client;
                        next();
                    } else res.status(500).send("Client not registered");
                },
                error => res.status(500).send(error.message));
        } else {
            req.user = undefined;
            next(); // make sure that proceeds to the next routes and don't stop here
        }
    });

    // Present SPA
    app.use('/', express.static(path.resolve(__dirname, 'public')));
    // Present Documentation
    app.use('/docs', express.static(path.resolve(__dirname, 'docs')));
    // REGISTER ROUTES -------------------------------
    router(app);

    // Define the listenning port
    var port = process.env.PORT || 8080;
    // start http server
    app.listen(port, () => {
        // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        console.log('\x1b[32m%s %d\x1b[0m.', '(PLAIN) Server http listening on port', port);
    });

    // //set options to https
    // const options = {
    //     key: fs.readFileSync(__dirname + "/app/keys/https_key.pem"),
    //     cert: fs.readFileSync(__dirname + "/app/keys/https_cert.pem"),
    //     ca: fs.readFileSync(__dirname + "/app/keys/https_ca.pem"),
    //     dhparam: fs.readFileSync(__dirname + "/app/keys/https_dhparam.pem")
    // };
    // // start https server
    // https.createServer(options, app).listen(8080, () => {
    //     console.log('\x1b[32m%s %d\x1b[0m.', '(PLAIN) Server https listening on port', port);
    // });
}