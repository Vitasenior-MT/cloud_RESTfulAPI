// MIDDLEWARE FOR OUR API
// =============================================================================
module.exports = (app) => {
  var bodyParser = require('body-parser'),
    utils = require('./business/index').v1_0_0.utils;

  // middleware to use for all requests
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Version");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);

    if (process.env.NODE_ENV === "development") console.log("\x1b[36m" + req.method, req.url + "\x1b[0m");

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