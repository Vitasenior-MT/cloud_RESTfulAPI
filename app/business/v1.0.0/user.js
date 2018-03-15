var db = require('../../models/index'),
    utils = require('./utils');

exports.register = function (email, password) {
    return new Promise((resolve, reject) => {

        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(password))
            if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email))

                utils.encrypt([email, password]).then(
                    encrypted => db.User.create({ email: encrypted[0], password: encrypted[1] }).then(
                        new_user => resolve(new_user),
                        error => reject({ code: 500, msg: error.message })),
                    error => reject({ code: 500, msg: error.message }));

            else reject({ code: 500, msg: "invalid email" });
        else reject({ code: 500, msg: "invalid password, must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters" });
    });
}

exports.login = function (email, password) {
    return new Promise((resolve, reject) => {
        utils.encrypt([email, password]).then(
            encrypted => {
                db.User.findOne({ where: { email: encrypted[0], password: encrypted[1] } }).then(
                    user => {
                        if (user) resolve(user);
                        else reject({ code: 500, msg: "email and password don't match" });
                    }, error => reject({ code: 500, msg: error.message }));
            }, error => reject({ code: 500, msg: error.message }));
    });
}

exports.changePassword = function (user_id, old_password, new_password) {
    return new Promise((resolve, reject) => {
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(new_password))
            utils.encrypt([old_password, new_password]).then(
                encrypted => {
                    db.User.findOne({ where: { id: user_id, password: encrypted[0] } }).then(
                        user => {
                            if (user) user.update({ password: encrypted[1] }).then(
                                () => resolve(),
                                error => reject({ code: 500, msg: error.message }));
                            else reject({ code: 500, msg: "old password don't match" });
                        }, error => reject({ code: 500, msg: error.message }));
                }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "invalid password, must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters" });
    });
}

exports.findByEmail = function (email, password) {
    return new Promise((resolve, reject) => {
        utils.encrypt([email]).then(
            encrypted => db.User.findOne({ where: { email: encrypted[0] } }).then(
                user => {
                    if (user) resolve(user);
                    else reject({ code: 500, msg: "user not registered" });
                }, error => reject({ code: 500, msg: error.message })),
            error => reject({ code: 500, msg: error.message }));
    });
}