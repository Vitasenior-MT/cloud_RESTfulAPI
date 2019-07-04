var db = require('../../models/index'),
  crypto = require("crypto"),
  jwt = require('jsonwebtoken');

exports.encrypt = (to_encrypt) => {
  try {
    return {
      value: to_encrypt.map(element => {
        let cipher = crypto.createCipher(process.env.CIPHER_ALGORITHM, process.env.CIPHER_KEY);
        return element = cipher.update(Buffer.from(element), 'utf8', 'hex') + cipher.final('hex');
      }), error: null
    };
  } catch (error) {
    return { value: null, error: error };
  }
}

exports.decrypt = (to_decrypt) => {
  let decipher = crypto.createDecipher(process.env.CIPHER_ALGORITHM, process.env.CIPHER_KEY);
  return decipher.update(to_decrypt, 'hex', 'utf8') + decipher.final('utf8');
}

exports.createToken = (obj) => {
  return new Promise((resolve, reject) => {
    let payload = {
      id: obj.id,
      role: obj.constructor.name
    };
    let options = {
      expiresIn: "8h",
      algorithm: "RS256"
    };

    let prKey="-----BEGIN PRIVATE KEY-----\n"+process.env.PRIVATE_KEY+"=\n-----END PRIVATE KEY-----";

    jwt.sign(payload, prKey, options, (error, token) => {
      if (error) reject({ code: 500, msg: error.message });
      resolve(token);
    });
  });
}

exports.validateToken = (token) => {
  return new Promise((resolve, reject) => {
    let options = {
      algorithms: ["RS256"]
    };

    let puKey="-----BEGIN PUBLIC KEY-----\n"+process.env.PUBLIC_KEY+"\n-----END PUBLIC KEY-----";

    jwt.verify(token, puKey, options, (error, payload) => {
      if (error) reject({ code: 500, msg: error.message });
      db[payload.role].findOne({ where: { id: payload.id } }).then(
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

exports.capitalString = (str) => {
  return str.split(" ").map(x => x[0].toUpperCase() + x.substring(1)).join(" ");
}