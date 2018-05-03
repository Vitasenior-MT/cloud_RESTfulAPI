var db = require('../../models/index'),
  crypto = require("crypto"),
  fs = require("fs"),
  jwt = require('jsonwebtoken'),
  path = require("path"),
  mime = require('mime-types'),
  multer = require('multer'),
  uuidv4 = require('uuid/v4');

exports.encrypt = (to_encrypt) => {
  try {
    return {
      value: to_encrypt.map((element, index) => {
        let cipher = crypto.createCipher(process.env.ALGORITHM, process.env.KEY);
        return element = cipher.update(Buffer.from(element), 'utf8', 'hex') + cipher.final('hex');
      }), error: null
    };
  } catch (error) {
    return { value: null, error: error };
  }
}

exports.decrypt = (to_decrypt) => {
  let decipher = crypto.createDecipher(process.env.ALGORITHM, process.env.KEY);
  return decipher.update(to_decrypt, 'hex', 'utf8') + decipher.final('utf8');
}

exports.createToken = (obj, client_address) => {
  return new Promise((resolve, reject) => {
    let private_key = fs.readFileSync(__dirname + '/../../keys/key.pem').toString();
    if (private_key === undefined) reject({ code: 500, msg: "error on load private key" });

    let payload = {
      id: obj.id,
      role: obj.constructor.name
    };
    let options = {
      expiresIn: "8h",
      algorithm: "RS256",
      subject: client_address
    };
    jwt.sign(payload, private_key, options, (error, token) => {
      if (error) reject({ code: 500, msg: error.message });
      resolve(token);
    });
  });
}

exports.validateToken = (token, client_address) => {
  return new Promise((resolve, reject) => {
    let public_key = fs.readFileSync(__dirname + '/../../keys/cert.pem').toString();
    if (public_key === undefined) reject("error on load public key");

    let options = {
      algorithms: ["RS256"],
      subject: client_address
    };

    jwt.verify(token, public_key, options, (error, payload) => {
      if (error) reject({ code: 500, msg: error.message });
      db[payload.role].findById(payload.id).then(
        obj => resolve(obj),
        error => reject({ code: 500, msg: error.message })
      );
    });
  });
}

exports.generatePassword = (n_char) => {
  let sk = "", i, j, base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (i = 0; i < n_char; i++) sk += base[Math.floor(Math.random() * 61)];
  return sk;
}

exports.upload = (html_name) => {
  return new Promise((resolve, reject) => {
    try {
      let obj = multer({
        storage: multer.diskStorage(
          {
            destination: path.resolve(__dirname, '..', '..', '..', 'files'),
            filename: (req, file, cb) => cb(null, uuidv4() + '.' + mime.extension(file.mimetype))
          }
        ),
        fileFilter: (req, file, cb) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) return cb(new Error('Only image files are allowed!'), false);
          cb(null, true);
        }
      }).single(html_name);
      resolve(obj);
    } catch (err) { reject({ code: 500, msg: err.message }); }
  });
}

exports.upload = (html_name, filename) => {
  return new Promise((resolve, reject) => {
    try {
      let obj = multer({
        storage: multer.diskStorage(
          {
            destination: path.resolve(__dirname, '..', '..', '..', 'files'),
            filename: (req, file, cb) => cb(null, filename + '.' + mime.extension(file.mimetype))
          }
        ),
        fileFilter: (req, file, cb) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) return cb(new Error('Only image files are allowed!'), false);
          cb(null, true);
        }
      }).single(html_name);
      resolve(obj);
    } catch (err) { reject({ code: 500, msg: err.message }); }
  });
}

exports.download = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      let file = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'files', filename));
      let header = { 'Content-Type': mime.lookup(filename) }
      resolve({ file: file, header: header });
    } catch (err) { reject({ code: 500, msg: err.message }); }
  });
}


// JUST TO DEVELOPMENT
exports.deleteAll = () => {
  return new Promise((resolve, reject) => {

    var options = { raw: true };

    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options).then(() => {
      db.UserVitabox.truncate().then(() => {
        db.User.truncate().then(() => {
          db.Vitabox.truncate().then(() => {
            db.Boardmodel.truncate().then(() => {
              db.Board.truncate().then(() => {
                db.Patient.truncate().then(() => {
                  db.RecordTemp.remove({}, () => {
                    db.RecordOld.remove({}, () => {
                      db.RecordCheck.remove({}, () => {
                        db.Log.remove({}, () => {
                          db.Warning.remove({}, () => {
                            db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options).then(
                              () => resolve(),
                              error => reject(error));
                          });
                        }, error => reject(error));
                      }, error => reject(error));
                    }, error => reject(error));
                  }, error => reject(error));
                }, error => reject(error));
              }, error => reject(error));
            }, error => reject(error));
          }, error => reject(error));
        }, error => reject(error));
      }, error => reject(error));
    }, error => reject(error));
  });
}

exports.testSeed = () => {
  return new Promise((resolve, reject) => {
    require('../../models/seed').testSeed(db).then(
      () => resolve(),
      error => reject(error));
  });
}