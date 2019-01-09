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
      value: to_encrypt.map(element => {
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

exports.createToken = (obj) => {
  return new Promise((resolve, reject) => {
    let private_key = fs.readFileSync(__dirname + '/../../keys/key.pem').toString();
    if (private_key === undefined) reject({ code: 500, msg: "error on load private key" });

    let payload = {
      id: obj.id,
      role: obj.constructor.name
    };
    let options = {
      expiresIn: "8h",
      algorithm: "RS256"
    };
    jwt.sign(payload, private_key, options, (error, token) => {
      if (error) reject({ code: 500, msg: error.message });
      resolve(token);
    });
  });
}

exports.validateToken = (token) => {
  return new Promise((resolve, reject) => {
    let public_key = fs.readFileSync(__dirname + '/../../keys/cert.pem').toString();
    if (public_key === undefined) reject({ code: 500, msg: "error on load public key" });

    let options = {
      algorithms: ["RS256"]
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
            filename: (req, file, cb) => cb(null, uuidv4() + uuidv4() + uuidv4() + '.' + mime.extension(file.mimetype))
          }
        ),
        fileFilter: (req, file, cb) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) return cb(new Error('Only image files are allowed!'), false);
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