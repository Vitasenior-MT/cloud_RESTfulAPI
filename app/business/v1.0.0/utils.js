var crypto = require("crypto"),
    fs = require("fs"),
    jwt = require('jsonwebtoken'),
    db = require('../../models/index');

exports.encrypt = function (to_encrypt) {
    return new Promise((resolve, reject) => {
        to_encrypt.forEach((element, index) => {
            let cipher = crypto.createCipher(process.env.ALGORITHM, process.env.KEY);
            return to_encrypt[index] = cipher.update(Buffer.from(element), 'utf8', 'hex') + cipher.final('hex');
        });
        resolve(to_encrypt);
    });
}

exports.decrypt = function (to_decrypt) {
    let decipher = crypto.createDecipher(process.env.ALGORITHM, process.env.KEY);
    return decipher.update(to_decrypt, 'hex', 'utf8') + decipher.final('utf8');
}

exports.createToken = function (obj, client_address) {
    return new Promise((resolve, reject) => {
        let private_key = fs.readFileSync(__dirname + '/../../keys/key.pem').toString();
        if (private_key === undefined) reject(new Error("error on load private key"));

        let payload = {
            id: obj.id,
            role: obj.constructor.name
        };
        let options = {
            expiresIn: "8h",
            algorithm: "RS256",
            subject: client_address
        };

        jwt.sign(payload, private_key, options, function (err, token) {
            if (err) reject(err);
            resolve(token);
        });
    });
}

exports.validateToken = function (token, client_address) {
    return new Promise((resolve, reject) => {
        let public_key = fs.readFileSync(__dirname + '/../../keys/cert.pem').toString();
        if (public_key === undefined) reject("error on load public key");

        let options = {
            algorithms: ["RS256"],
            subject: client_address
        };

        jwt.verify(token, public_key, options, function (err, payload) {
            if (err) reject(err);
            db[payload.role].findById(payload.id).then(
                obj => resolve(obj),
                error => reject(error)
            );
        });
    });
}

exports.generatePassword = () => {
    let sk = "", i, j, base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < 10; i++) {
        sk += base[Math.floor(Math.random() * 61)];
    }
    return sk;
}


// JUST TO DEVELOPMENT
exports.deleteAll = function () {
    return new Promise((resolve, reject) => {

        var options = { raw: true };

        db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options).then(() => {
            db.UserVitabox.truncate().then(() => {
                db.User.truncate().then(() => {
                    db.Vitabox.truncate().then(() => {
                        db.Boardmodel.truncate().then(() => {
                            db.Board.truncate().then(() => {
                                db.Patient.truncate().then(() => {
                                    db.Record.remove({}, () => {
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
    });
}

exports.testSeed = function () {
    return new Promise((resolve, reject) => {
        require('../../models/seed').testSeed(db).then(
            () => resolve(),
            error => reject(error));
    });
}