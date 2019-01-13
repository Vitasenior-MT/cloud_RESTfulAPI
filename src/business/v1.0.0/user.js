var db = require('../../models/index'),
    utils = require('./utils');

exports.register = (email, password, name) => {
    return new Promise((resolve, reject) => {
        if (/[A-Z][a-zA-Z\'áéíóõãÁÉÍÓ][^#&<>\"~;$^%{}?!*+_\-»«@£§€ªº,0-9]{1,50}$/.test(name))
            if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(password))
                if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)) {
                    let encrypted = utils.encrypt([email, password, name]);
                    if (!encrypted.error) db.User.create({ email: encrypted.value[0], password: encrypted.value[1], name: encrypted.value[2] }).then(
                        new_user => resolve(new_user),
                        error => reject({ code: 500, msg: error.message }));
                    else reject({ code: 500, msg: encrypted.error.message });
                } else reject({ code: 500, msg: "invalid email" });
            else reject({ code: 500, msg: "invalid password, must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters" });
        else reject({ code: 500, msg: "invalid name" });
    });
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        let encrypted = utils.encrypt([email, password]);
        if (!encrypted.error) db.User.findOne({ where: { email: encrypted.value[0], password: encrypted.value[1] } }).then(
            user => {
                if (user) resolve(user);
                else reject({ code: 500, msg: "email and password don't match" });
            }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: encrypted.error.message });
    });
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        db.User.findAll({ attributes: ['id', 'name', 'email', 'photo', ['admin', 'is_admin'], ['doctor', 'is_doctor']] }).then(
            users => {
                users.forEach(user => {
                    user.name = utils.decrypt(user.name);
                    user.email = utils.decrypt(user.email);
                })
                resolve(users);
            },
            error => reject({ code: 500, msg: error.message }));
    })
}

exports.changePassword = (user, password) => {
    return new Promise((resolve, reject) => {
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(password)) {
            let encrypted = utils.encrypt([password]);
            if (!encrypted.error) user.update({ password: encrypted.value[0] }).then(
                () => resolve(),
                error => reject({ code: 500, msg: error.message }));
            else reject({ code: 500, msg: encrypted.error.message });
        } else reject({ code: 500, msg: "invalid password, must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters" });
    });
}

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        let encrypted = utils.encrypt([email]);
        if (!encrypted.error) db.User.findOne({ where: { email: encrypted.value[0] } }).then(
            user => {
                if (user) {
                    user.name = utils.decrypt(user.name);
                    user.email = utils.decrypt(user.email);
                    resolve(user);
                }
                else reject({ code: 404, msg: "user not registered" });
            }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: encrypted.error.message });
    });
}

exports.createRecoverToken = (user) => {
    return new Promise((resolve, reject) => {
        let token = utils.generatePassword(12);
        let encrypted = utils.encrypt([token]);
        if (!encrypted.error) user.update({ resetPasswordToken: encrypted.value[0], resetPasswordExpires: Date.now() + 3600000 }).then(
            () => resolve(token),
            error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: encrypted.error.message });
    });
}

exports.sendRecoverEmail = (user, token) => {
    return new Promise((resolve, reject) => {
        try {
            var nodemailer = require('nodemailer');
            console.log({
                host: process.env.MAIL_HOST,
                port: parseInt(process.env.MAIL_PORT),
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            });

            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",//process.env.MAIL_HOST,
                port: 465,//parseInt(process.env.MAIL_PORT),
                secure: true,
                // service: 'gmail',
                auth: {
                    user: "vitamailtester@gmail.com",//process.env.MAIL_USER,
                    pass: "123qweASDzXc"//process.env.MAIL_PASS
                },
                debug: true,
                logger: true
            });
            var mailOptions = {
                to: "farruscamendes@gmail.com",//utils.decrypt(user.email),
                from: "vitamailtester@gmail.com",//process.env.MAIL_USER,
                subject: 'Vitasenior Password Reset',
                html: '<h2>Reset Password</h2><hr><p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p><p>Please use this code to reset your password: <b>' + token + '</b></p><p>If you did not request this, please ignore this email and your password will remain unchanged.</p>'
            };
            transporter.sendMail(mailOptions, (err) => {
                if (err) reject({ code: 500, msg: err.message });
                else resolve();
            });

        } catch (err) { reject({ code: 500, msg: error }); }

    });
}

exports.verifyRecoverToken = (token) => {
    return new Promise((resolve, reject) => {
        let encrypted = utils.encrypt([token]);
        if (!encrypted.error) db.User.findOne({ where: { resetPasswordToken: encrypted.value[0] } }).then(
            user => {
                if (user && user.resetPasswordExpires > Date.now()) {
                    user.update({ resetPasswordToken: null }).then(
                        () => resolve(user),
                        error => reject({ code: 500, msg: error.message }));
                }
                else reject({ code: 500, msg: "invalid code, please verify your email or request again" });
            }, error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: encrypted.error.message });
    });
}

exports.updatePhoto = (user, filename) => {
    return new Promise((resolve, reject) => {
        user.update({ photo: filename }).then(
            () => resolve(),
            error => reject({ code: 500, msg: error.message }));
    });
}