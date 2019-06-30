// MIDDLEWARE FOR OUR API
// =============================================================================
module.exports = (app) => {
  var bodyParser = require('body-parser'),
    i18n = require("i18n"),
    utils = require('./business/index').v1_0_0.utils;

  i18n.configure({
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    register: global,
    directory: __dirname + '/locales',
    api: {
      '__': 't',  //now req.__ becomes req.t
      '__n': 'tn' //and req.__n can be called as req.tn
    }
  });

  app.use(i18n.init);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // middleware to use for all requests
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Version, Accept-Ranges");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);

    console.log("\x1b[36m" + req.method, req.url + "\x1b[0m", req.connection.remoteAddress);

    if (req.method === "OPTIONS") { return res.send(200); }
    if (req.headers.authorization) {
      utils.validateToken(req.headers.authorization).then(
        client => {
          if (client) req.client = client;
          else req.client = null;
          next();
        },
        error => { req.client = null; next(); });
    } else { req.client = null; next(); }
  });
}