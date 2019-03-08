var business = require('../../business/index').v1_0_0,
    multiparty = require('multiparty'),
    path = require('path'),
    fs = require('fs'),
    store = require('../../storage/index');

/**
 * @api {get} patient/:id/info 01) Get patient info
 * @apiGroup Patient
 * @apiName getPatientInfo
 * @apiDescription get patient info.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission doctor
 * @apiParam {string} :id patient id
 * @apiSuccessExample {json} Response example:
 * {
 *  patient:{
 *      "name": "José António",
 *      "medication": ["paracetamol", "brufen"],
 *      "info": "problemas a dormir",
 *      "Boards": [
 *              {
 *                  "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *                  "description": "kitchen",
 *                  "mac_addr": "00:12:4b:00:06:0d:60:c8",
 *                  "since": "2018-07-23T05:15:27.000Z",
 *                  "schedules": [10, 20],
 *                  "Boardmodel": {
 *                      "id": "17770821-6f5a-41b3-8ea3-d42c000326c6",
 *                      "type": "environmental",
 *                      "name": "Zolertia RE-Mote",
 *                      "tag": "zolertiaremote"
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
 *                              "unit": "%",
 *                              "min_acceptable": "30.00000",
 *                              "max_acceptable": "50.00000",
 *                              "min_possible": "20.00000",
 *                              "max_possible": "60.00000",
 *                              "to_read": "temperature",
 *                              "tag": "humi"
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
 *                  "min_diurnal": 20,
                    "max_diurnal": 30,
                    "min_nightly": 21,
                    "max_nightly": 31,
 *                  "last_values": [22, 23, 25, 23]
 *              },
 *              {
 *                  "id": "32443b5e-28cd-ab43-b86b-a423442401b8", 
 *                  "measure": "weight", 
 *                  "tag": "weight", 
 *                  "min_diurnal": 58, 
 *                  "max_diurnal": 64,
 *                  "min_nightly": 60, 
 *                  "max_nightly": 70,
 *                  "last_value": [63, 64]
 *              }
 *          ],
 *  }
 * }
 */
exports.getPatientInfo = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.getInfo(req.params.id).then(
            patient => business.vitabox.verifyUser(req.client, patient.Vitabox).then(
                () => {
                    delete patient.Vitabox;
                    res.status(200).json({ patient: patient })
                }, error => business.patient.verifyDoctor(req.client, patient).then(
                    () => {
                        delete patient.Vitabox;
                        res.status(200).json({ patient: patient })
                    }, error => res.status(500).send(error.msg))),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} patient/:id/info 01) Update personal data
 * @apiGroup Patient
 * @apiName updateInfoToPatient
 * @apiDescription update profile from patient.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission doctor
 * @apiParam {string} :id patient id
 * @apiParam {string} name patient name
 * @apiParam {date} birthdate patient birthdate (date only)
 * @apiParam {string} gender patient gender (must be 'male', 'female' or 'undefined')
 * @apiParam {string} cc patient citizen card number
 * @apiParam {string} nif patient fiscal number
 * @apiParamExample {json} Request example:
 *     {
 *          "name": "José António",
 *          "birthdate": "1987-02-28",
 *          "gender": "male",
 *          "cc": "123456789",
 *          "nif": "987654321",
 *          "info": "sofre do sono"
 *     }
 * @apiSuccess {boolean} result returns true if was successfuly updated
 */
exports.updateInfo = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.find(req.params.id).then(
            patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                () => business.patient.setInfoData(patient, req.body).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(500).send(error.msg)),
                error => res.status(500).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} patient/:id/biometric 02) Update Biometric Data
 * @apiGroup Patient
 * @apiName updateProfilesToPatient
 * @apiDescription update height and weight from patient.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission doctor
 * @apiParam {string} :id patient id
 * @apiParam {decimal} height patient height
 * @apiParam {decimal} weight patient weight
 * @apiParamExample {json} Request example:
 *     {
 *          "height": 1.72,
 *          "weight": 78.2m,
 *          "medication": ["paracetamol", "brufen"],
 *          "info": "sofre do sono"
 *     }
 * @apiSuccess {boolean} result returns true if was successfuly updated
 */
exports.updateBiometric = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.patient.verifyDoctor(req.client, req.params.id).then(
            () => business.patient.setBiometricData(req.params.id, req.body).then(
                () => res.status(200).json({ result: true }),
                error => res.status(500).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} patient/:id/profile 03) Update profile
 * @apiGroup Patient
 * @apiName updateProfilesToPatient
 * @apiDescription update profile from patient.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission doctor
 * @apiParam {string} :id patient id
 * @apiParam {string} description clinical profile description
 * @apiParam {array} profiles list of profiles to define with the minimum and maximum acceptable values and the profile id
 * @apiParamExample {json} Request example:
 *     {
 *          "profiles":[
 *              {
 *                "id": "585402ef-68dd-44a4-a44b-04152e659d11",
 *                 "min_diurnal": 58, 
*                  "max_diurnal": 64,
*                  "min_nightly": 60, 
*                  "max_nightly": 70,
 *              }
 *          ],
 *          "description": "Diabetes tipo 1"
 *     }
 * @apiSuccess {boolean} result returns true if was successfuly updated
 */
exports.updateProfile = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.patient.verifyDoctor(req.client, req.params.id).then(
            () => Promise.all([
                business.profile.update(req.params.id, req.body.profiles),
                business.patient.updateProfile(req.params.id, req.body.description)
            ]).then(
                () => res.status(200).json({ result: true }),
                error => res.status(500).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /patient/:id/doctor 04) Add Doctor
 * @apiGroup Patient
 * @apiName addDoctor
 * @apiDescription add doctor to a specific patient if the requester is sponsor of him.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id patient unique ID
 * @apiParam {string} email email of the user to add
 * @apiParamExample {json} Request example:
 *     {
 *          "email": "user-example@some.thing"
 *     }
 * @apiSuccessExample {json} Response example:
 * {
 *  doctor:{
 *      "id":"585402ef-68dd-44a4-a44b-04152e659d11",
 *      "name":"Jose Manel",
 *      "email": "jmanfns@a.aa"
 *  }
 * }
 */
exports.addDoctor = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.user.findByEmail(req.body.email).then(
            user => business.patient.find(req.params.id).then(
                patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                    () => business.patient.addDoctor(patient, user.id).then(
                        () => business.warning.setWarningDoctor(user.id, patient.id).then(
                            () => business.doctor.setHasDoctor(user).then(
                                () => res.status(200).json({ doctor: { id: user.id, name: user.name, email: user.email, since: new Date() } }),
                                error => res.status(error.code).send(error.msg)),
                            error => res.status(error.code).send(error.msg)),
                        error => res.status(error.code).send(error.msg)),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /patient/:id/doctor 05) Accept as Doctor
 * @apiGroup Patient
 * @apiName acceptAsDoctor
 * @apiDescription doctor accept patient
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :id patient unique ID
 * @apiParam {boolean} accept flag indicating if accept patient
 * @apiParamExample {json} Request example:
 *     {
 *          "accept": true
 *     }
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.acceptAsDoctor = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.doctor.acceptAsDoctor(req.client.id, req.params.id, req.body.accept).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /patient/:id/doctor 06) Remove Doctor
 * @apiGroup Patient
 * @apiName removeDoctor
 * @apiDescription remove doctor from a patient if the requester is sponsor of him.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id patient unique ID
 * @apiParam {string} doctor_id doctor unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "doctor_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.removeDoctor = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.find(req.params.id).then(
            patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                () => business.patient.removeDoctor(patient, req.body.doctor_id).then(
                    () => business.warning.removeWarningDoctor(req.body.doctor_id, req.params.id).then(
                        () => business.doctor.setHasDoctor(req.client).then(
                            () => res.status(200).json({ result: true }),
                            error => res.status(error.code).send(error.msg)),
                        error => res.status(error.code).send(error.msg)),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /patient/:id/board 07) Get Boards
 * @apiGroup Patient
 * @apiName getBoardsFromPatient
 * @apiDescription Get boards from a patient
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiSuccessExample {json} Request example:
 * {
 *  "boards": [
 *      {
 *          "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *          "description": "kitchen",
 *          "mac_addr": "00:12:4b:00:06:0d:60:c8",
 *          "Boardmodel": {
 *              "id": "17770821-6f5a-41b3-8ea3-d42c000326c6",
 *              "type": "environmental",
 *              "name": "Zolertia RE-Mote"
 *          },
 *          "Sensors": [
 *              {
 *                  "id": "9cd77116-6edb-4072-9d66-204fca3d5a07",
 *                  "last_values": [ 17, 16, 13, 16, 15 ],
 *                  "last_commit": "2018-07-23T05:15:27.000Z",
 *                  "Sensormodel": {
 *                      "id": "1f8eab67-d39e-439e-b508-6ef6f2c6794a",
 *                      "transducer": "dht22",
 *                      "measure": "humidity",
 *                      "min_acceptable": "30.00000",
 *                      "max_acceptable": "50.00000",
 *                      "min_possible": "20.00000",
 *                      "max_possible": "60.00000"
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * }
 */
exports.getBoardsFromPatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.patient.getBoards(req.params.id).then(
            result => res.status(200).json({ boards: result }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /patient/:id/photo 08) Update photo
 * @apiGroup Patient
 * @apiName setPhotoFromPatient
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiPermission sponsor
 * 
 * @apiParam {string} :id patient id
 * @apiParam {FormData} image FormData type file (max 70KB allowed)
 * @apiSuccess {boolean} result return true if was sucessfuly reseted
 */
exports.setPhoto = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.find(req.params.id).then(
            patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                () => {
                    let form = new multiparty.Form({ autoFiles: true, maxFilesSize: 1024 * 70 });
                    form.on('file', (name, file) => {
                        fs.readFile(file.path, (err, fileData) => {
                            if (err) res.status(500).send(err.message);
                            else {
                                let filename = business.utils.generatePassword(32) + path.extname(file.originalFilename);
                                let promises = [
                                    business.utils.encrypt([filename]),
                                    store.uploadFile(process.env.STORE_BUCKET, filename, fileData)
                                ];
                                if (patient.photo) {
                                    promises.push(store.deleteFile(process.env.STORE_BUCKET, business.utils.decrypt(patient.photo)));
                                }
                                Promise.all(promises).then(response => {
                                    if (!response[0].error) business.patient.updatePhoto(patient, response[0].value[0])
                                        .then(() => res.status(200).json({ filename: filename }))
                                        .catch(error => store.deleteFile(process.env.STORE_BUCKET, filename)
                                            .then(() => res.status(error.code).send(error.message))
                                            .catch(error => res.status(error.code).send(error.msg)));
                                    else store.deleteFile(process.env.STORE_BUCKET, filename)
                                        .then(() => res.status(500).send(res[0].error.message))
                                        .catch(error => res.status(error.code).send(error.msg));

                                }).catch(error => res.status(error.code).send(error.msg));
                            }
                        })
                    });
                    form.on('error', (err) => res.status(500).send(err.message));
                    form.parse(req);
                }, error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {put} /patient/:id/exam 09) Update Exam
 * @apiGroup Patient
 * @apiName updateSchedule
 * @apiDescription update exam scheduling to patient
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin, sponsor
 * @apiParam {string} :id patient id
 * @apiParam {string} board_id board id
 * @apiParam {array} schedules list of times in hours
 * @apiParam {integer} frequency range days between exams
 * @apiParamExample {json} Request example:
 *     {
 *          "board_id":"5d93585b-f511-4fa8-b69e-692c2474d5e8",
 *          "schedules": [10, 20],
 *          "frequency": 2
 *     }
 * @apiSuccess {booleam} result returns true if was successfuly updated
 */
exports.updateSchedule = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.patient.verifyDoctor(req.client, req.params.id).then(
            () => business.board.updateSchedule(req.body.board_id, req.params.id, req.body).then(
                () => res.status(200).json({ result: true }),
                error => res.status(500).send("cannot update exame schedule")),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}