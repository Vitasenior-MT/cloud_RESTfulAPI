var business = require('../../business/index').v1_0_0,
    broker = require("../../brokers/index"),
    store = require('../../storage/index'),
    multiparty = require('multiparty'),
    path = require('path'),
    fs = require('fs');
/**
 * @apiDefine auth
 * 
 * @apiHeader Accept-Version="1.0.0"
 * @apiHeader Accept-Language="pt"
 * @apiHeader Content-Type="application/json"
 * @apiError {number} statusCode http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} statusMessage error description
 */

/**
 * @api {post} /register 01) Register user
 * @apiGroup Authentication
 * @apiName userRegister
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid email
 * @apiParam {string} name valid name
 * @apiParam {string} password must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 * @apiSuccess {string} id user id
 * @apiSuccess {string} name user name
 * @apiSuccess {string} email user email
 * @apiSuccess {boolean} is_admin flag indicating if is admin
 * @apiSuccess {boolean} is_doctor flag indicating if is doctor
 * @apiSuccess {string} photo user photo
 * @apiSuccessExample {json} Response example:
 * {
 *      "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0YmIyNTFjLWYxY2EtNGVjZC04OTNlLTU2YWU0MDRlZjhlZiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNTI1MzQzNTg4LCJleHAiOjE1MjUzNzIzODgsInN1YiI6Ijo6ZmZmZjoxMC4wLjIuMiJ9.eZQ9dmDROpIh_6aEcoTTgH_DGauqNxqIsYSsW-tNoXQsLyBQb0VPLnFRzi7n_yKB_D43SGfj8PxBaDmt0WWgbjlKOJdP6WZYz5W_eVWDjpcNjzIq2nj8W1B3AstxZ5RmnP-NFd96Vot-O7mXXk96zGqTzIPYZcL3eX-MvgugCbGr2ikzyJ9y4oWxedzZTsY7u1C_Fy9ZuIG_LFUAZ7yBFXOWYSYdI8VEwxF3rgU1eagUZKO8ZMzVsRQPptSWA3i5-fJW3-k6tfstRcr-nUBOda7diBmuw6cT7zDgtuEyctouuH_RAP-lNuoIpn8pbiSunrNB2D8CGh7RP7CPvu3NSA",
 *      "id": "84bb251c-f1ca-4ecd-893e-56ae404ef8ef",
 *      "name": "Administrator Exemple",
 *      "email": "admin@some.thing",
 *      "is_admin": true,
 *      "is_doctor": false,
 *      "photo": "8b2fe0d0-0311-494a-8e27-522407d21b0e44fe0662-1271-4f42-a764-eeb0ba87cd87a2d6f862-c7e9-43a1-8066-87f157da7147.jpeg"
 * }
 */
exports.register = (req, res) => {
    business.user.tempRegister(req.body.email, req.body.password, req.body.name).then(
        temp_user => business.user.sendEmail("confirm_email", temp_user.email, temp_user._id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg)),
        error => res.status(error.code).send(error.msg));
}

/**
 * @api {post} /validate/:token 02) Validate Email
 * @apiGroup Authentication
 * @apiName validateEmail
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} token token provided to validate the eamil
 * @apiSuccess {html} web page to confirm the reception
 */
exports.validateEmail = (req, res) => {
    let path = require('path');
    business.user.definitiveRegister(req.params.token).then(
        user => broker.notification.log(user.id, "user_register").then(
            () => res.status(200).sendfile(path.resolve(__dirname, '..', '..', '..', 'public', 'confirm_email.html')),
            error => res.status(error.code).sendfile(path.resolve(__dirname, '..', '..', '..', 'public', 'error.html'))),
        error => res.status(error.code).sendfile(path.resolve(__dirname, '..', '..', '..', 'public', 'error.html')));
}

/**
 * @api {post} /login 03) Login user
 * @apiGroup Authentication
 * @apiName userLogin
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid email
 * @apiParam {string} password must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 * @apiSuccess {string} id user id
 * @apiSuccess {string} name user name
 * @apiSuccess {string} email user email
 * @apiSuccess {boolean} is_admin flag indicating if is admin
 * @apiSuccess {boolean} is_doctor flag indicating if is doctor
 * @apiSuccess {string} photo user photo
 * @apiSuccess {number} warnings unseen warnings count,
 * @apiSuccess {number} errors unseen errors count (if not admin always 0)
 * @apiSuccessExample {json} Response example:
 * {
 *      "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0YmIyNTFjLWYxY2EtNGVjZC04OTNlLTU2YWU0MDRlZjhlZiIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNTI1MzQzNTg4LCJleHAiOjE1MjUzNzIzODgsInN1YiI6Ijo6ZmZmZjoxMC4wLjIuMiJ9.eZQ9dmDROpIh_6aEcoTTgH_DGauqNxqIsYSsW-tNoXQsLyBQb0VPLnFRzi7n_yKB_D43SGfj8PxBaDmt0WWgbjlKOJdP6WZYz5W_eVWDjpcNjzIq2nj8W1B3AstxZ5RmnP-NFd96Vot-O7mXXk96zGqTzIPYZcL3eX-MvgugCbGr2ikzyJ9y4oWxedzZTsY7u1C_Fy9ZuIG_LFUAZ7yBFXOWYSYdI8VEwxF3rgU1eagUZKO8ZMzVsRQPptSWA3i5-fJW3-k6tfstRcr-nUBOda7diBmuw6cT7zDgtuEyctouuH_RAP-lNuoIpn8pbiSunrNB2D8CGh7RP7CPvu3NSA",
 *      "id": "84bb251c-f1ca-4ecd-893e-56ae404ef8ef",
 *      "name": "Administrator Exemple",
 *      "email": "admin@some.thing",
 *      "is_admin": true,
 *      "is_doctor": false,
 *      "photo": "8b2fe0d0-0311-494a-8e27-522407d21b0e44fe0662-1271-4f42-a764-eeb0ba87cd87a2d6f862-c7e9-43a1-8066-87f157da7147.jpeg",
 *      "warnings": 0,
 *      "errors": 0
 * }
 */
exports.login = (req, res) => {
    business.user.login(req.body.email, req.body.password).then(
        user => business.utils.createToken(user, req.connection.remoteAddress).then(
            token => broker.notification.log(user.id, "user_login").then(
                () => business.warning.getWarningCount(user.id).then(
                    warnings => {
                        if (!user.admin) res.status(200).json({
                            token: token,
                            id: user.id,
                            name: business.utils.decrypt(user.name),
                            email: business.utils.decrypt(user.email),
                            is_admin: user.admin,
                            is_doctor: user.doctor,
                            photo: user.photo,
                            warnings: warnings,
                            errors: 0
                        });
                        else business.error.countUnseen().then(
                            errors => res.status(200).json({
                                token: token,
                                id: user.id,
                                name: business.utils.decrypt(user.name),
                                email: business.utils.decrypt(user.email),
                                is_admin: user.admin,
                                is_doctor: user.doctor,
                                photo: user.photo,
                                warnings: warnings,
                                errors: errors
                            }),
                            error => res.status(500).send(error.msg));
                    }, error => res.status(500).send(error.msg))),
            error => res.status(error.code).send(error.msg)),
        error => res.status(error.code).send(error.msg));
}

/**
 * @api {get} /check 04) Verify Token
 * @apiGroup Authentication
 * @apiName userVerifyToken
 * @apiDescription endpoint to check token validity.
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 */
exports.verifyToken = (req, res) => {
    if (req.client) {
        res.status(200).send("authorized");
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /chpass 05) Change password
 * @apiGroup Authentication
 * @apiName changePassword
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} password new password
 * @apiSuccess {boolean} result return true if was sucessfuly updated
 */
exports.changePassword = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.user.changePassword(req.client, req.body.password).then(
            () => broker.notification.log(req.client.id, "user_chgpass").then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {post} /forgot 06) Forgot Password
 * @apiGroup Authentication
 * @apiName forgotPassword
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid email
 * @apiSuccess {boolean} result return true if the email was sucessfuly sended
 */
exports.forgotPassword = (req, res) => {
    business.user.findByEmail(req.body.email).then(
        user => business.user.createRecoverToken(user).then(
            token => business.user.sendEmail("recover_pass", user.email, token).then(
                () => broker.notification.log(user.id, "user_fgtpass").then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg)),
        error => {
            if (error.code === 404) res.status(200).json({ result: true })
            else res.status(error.code).send(error.msg)
        });
}

/**
 * @api {post} /reset 07) Reset password
 * @apiGroup Authentication
 * @apiName resetPassword
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} token valid email
 * @apiParam {string} password new password
 * @apiSuccess {boolean} result return true if was sucessfuly reseted
 */
exports.resetPassword = (req, res) => {
    business.user.verifyRecoverToken(req.body.token).then(
        user => business.user.changePassword(user, req.body.password).then(
            () => broker.notification.log(user.id, "user_rstpass").then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg)),
        error => res.status(error.code).send(error.msg));
}

/**
 * @api {post} /photo 01) Update photo
 * @apiGroup User
 * @apiName setPhotoFromUser
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {FormData} image FormData type file (max 70KB allowed)
 * @apiSuccess {boolean} result return true if was sucessfuly updated
 */
exports.setPhoto = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        let form = new multiparty.Form({ autoFiles: true, maxFilesSize: 1024 * 70 });
        form.on('file', (name, file) =>
            fs.readFile(file.path, (err, fileData) => {
                if (err) res.status(500).send(err.message);
                else {
                    let filename = business.utils.generatePassword(32) + path.extname(file.originalFilename);
                    let promises = [
                        business.utils.encrypt([filename]),
                        store.uploadFile(process.env.STORE_BUCKET, filename, fileData)
                    ];
                    if (req.client.photo) {
                        promises.push(store.deleteFile(process.env.STORE_BUCKET, business.utils.decrypt(req.client.photo)));
                    }
                    Promise.all(promises).then(response => {
                        if (!response[0].error) business.user.updatePhoto(req.client, response[0].value[0])
                            .then(() => res.status(200).json({ filename: filename }))
                            .catch(error => store.deleteFile(process.env.STORE_BUCKET, filename)
                                .then(() => res.status(error.code).send(error.message))
                                .catch(error => res.status(error.code).send(error.msg)));
                        else store.deleteFile(process.env.STORE_BUCKET, filename)
                            .then(() => res.status(500).send(response[0].error.message))
                            .catch(error => res.status(error.code).send(error.msg));
                    }).catch(error => res.status(error.code).send(error.msg));
                }
            }));
        form.on('error', (err) => res.status(500).send(err.message));
        form.parse(req);
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {get} /user 02) List
 * @apiGroup User
 * @apiName listUsers
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiPermission admin
 * @apiSuccessExample {json} Response example:
 * {
    "users": [
        {
            "id": "1c64c510-4e17-46f8-bc97-c968d6b2e09b",
            "name": "Administrator Exemple",
            "email": "admin@a.aa",
            "photo": null,
            "is_admin": 1,
            "is_doctor": 0
        },
        {
            "id": "9fc1d895-4a61-43d4-b6fa-96005b2f8e99",
            "name": "José António",
            "email": "jose@a.aa",
            "photo": null,
            "is_admin": 0,
            "is_doctor": 0
        }
    ]
}
 */
exports.list = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.user.list().then(
            users => res.status(200).json({ users: users }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {get} /user/:id/log 03) Get Logs
 * @apiGroup User
 * @apiName getLogs
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiPermission admin
 * @apiSuccessExample {json} Response example:
    {
        "logs": [
            {
                "datetime": "2018-06-18T15:40:14.742Z",
                "message": "logged in",
                "user_id": "1c64c510-4e17-46f8-bc97-c968d6b2e09b",
                "id": "5b27d25e176a610eafa34a43"
            },
            {
                "datetime": "2018-06-18T15:40:14.789Z",
                "message": "logged in",
                "user_id": "1c64c510-4e17-46f8-bc97-c968d6b2e09b",
                "id": "5b27d25e176a610eafa34a44"
            },
            {
                "datetime": "2018-06-18T15:40:14.792Z",
                "message": "logged in",
                "user_id": "1c64c510-4e17-46f8-bc97-c968d6b2e09b",
                "id": "5b27d25e176a610eafa34a45"
            }
        ]
    }
 */
exports.getLogs = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.log.getByUser(req.params.id).then(
            logs => {
                logs.forEach(x => {
                    x.toJSON();
                    x.message = req.t.apply(this, x.message.split("+"));
                });
                res.status(200).json({ logs: logs });
            },
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {get} /doctor/patient 04) Get patients
 * @apiGroup User
 * @apiName getPatientsAsDoctor
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiPermission doctor
 * @apiSuccessExample {json} Response example:
 * {
 *  "patients": [
 *      {
 *          "id": "a77ea0fe-5e34-4189-9702-95cb69b4cd1d",
 *          "birthdate": "1987-02-28",
 *          "name": "José António",
 *          "gender": "male",
 *          "since": "2018-02-19T14:55:59.000Z",
 *          "active": true,
 *          "weight": 79.6,
 *          "height": 1.74,
 *          "cc": "123456789",
 *          "nif": "987654321",
 *          "Boards": [
 *              {
 *                  "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *                  "description": "kitchen",
 *                  "mac_addr": "00:12:4b:00:06:0d:60:c8",
 *                  "schedules": [10, 20],
 *                  "frequency": 2,
 *                  "Boardmodel": {
 *                      "id": "17770821-6f5a-41b3-8ea3-d42c000326c6",
 *                      "type": "environmental",
 *                      "name": "Zolertia RE-Mote"
 *                  },
 *                  "Sensors": [
 *                      {
 *                          "id": "9cd77116-6edb-4072-9d66-204fca3d5a07",
 *                          "last_values": [ 17, 16, 13, 16, 15 ],
 *                          "last_commit": "2018-07-23T05:15:27.000Z",
 *                          "Sensormodel": {
 *                              "id": "1f8eab67-d39e-439e-b508-6ef6f2c6794a",
 *                              "transducer": "dht22",
 *                              "measure": "humidity",
 *                              "min_acceptable": "30.00000",
 *                              "max_acceptable": "50.00000",
 *                              "min_possible": "20.00000",
 *                              "max_possible": "60.00000"
 *                          }
 *                      }
 *                  ]
 *              }
 *          ],
 *          "Profiles":[
 *              {
 *                  "id": "950c8b5e-6f43-4686-b21b-a435e96401b7", 
 *                  "measure": "body fat", 
 *                  "tag": "bodyfat", 
 *                  "min": 19, 
 *                  "max": 25
 *              },
 *              {
 *                  "id": "32443b5e-28cd-ab43-b86b-a423442401b8", 
 *                  "measure": "weight", 
 *                  "tag": "weight", 
 *                  "min": 58, 
 *                  "max": 64
 *              }
 *          ]
 *          "Vitabox": {
 *              "id": "a6abfa76-68f0-4325-b3ab-6c540a800284",
 *              "latitude": "51.5058372",
 *              "longitude": "-0.1899126",
 *              "address": "Kensington Gardens, London W8 4PX, Reino Unido"
 *          }
 *      }
 *  ]
 * }
 */
exports.getPatients = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.doctor.getPatients(req.client).then(
            patients => res.status(200).json({ patients: patients }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {get} /doctor/request/count 05) Count patient resquests
 * @apiGroup User
 * @apiName getRequestsCountAsDoctor
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiPermission doctor
 * @apiSuccessExample {json} Response example:
 * {
 *  "count": 12
 * }
 */
exports.getRequestsCount = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.doctor.countDoctorRequests(req.client.id).then(
            count => res.status(200).json({ count: count }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {get} /doctor/request/list 06) Get patient resquests
 * @apiGroup User
 * @apiName getRequestsAsDoctor
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiPermission doctor
 * @apiSuccessExample {json} Response example:
 * {
 *  "requests": [
 *      {
 *          "created_at": "2018-07-23T05:15:27.000Z", 
 *          "patient_id": "a6abfa76-68f0-4325-b3ab-6c540a800284", 
 *          "patient":"José Manuel"
 *      }
 *  ]
 * }
 */
exports.getRequests = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.doctor.listDoctorRequests(req.client.id).then(
            requests => res.status(200).json({ requests: requests }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}
