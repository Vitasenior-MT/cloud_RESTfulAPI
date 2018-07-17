var business = require('../../business/index').v1_0_0;

/**
 * @api {put} patient/:paid/profile/:prid 01) Update profile
 * @apiGroup Patient
 * @apiName updateProfilesToPatient
 * @apiDescription update profile from patient.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission doctor
 * @apiParam {string} :paid patient id
 * @apiParam {string} :prid profile id to update
 * @apiParam {decimal} min minimum value acceptable
 * @apiParam {decimal} max maximum value acceptable
 * @apiSuccess {boolean} result returns true if was successfuly updated
 */
exports.updateProfile = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.doctor) {
        business.patient.verifyDoctor(req.client, req.params.paid).then(
            () => business.profile.update(req.params.prid, req.body.min, req.body.max).then(
                () => res.status(200).json({ result: true }),
                error => res.status(500).send("cannot create profiles")),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /patient/:id/doctor 02) Add Doctor
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
                            () => business.user.setHasDoctor(user).then(
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
 * @api {get} /patient/:id/doctor 03) Get Doctors
 * @apiGroup Patient
 * @apiName getDoctors
 * @apiDescription get doctors list from a patient if the requester is sponsor of him.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :id patient unique ID
 * @apiSuccess {array} doctors patient doctors list
 * @apiSuccess {string} id id of each user
 * @apiSuccess {string} email email of each user
 * @apiSuccess {string} name name of each user
 * @apiSuccess {datetime} since relationship date with the patient
 * @apiSuccessExample {json} Response example:
 * {
 *  "doctors": [
 *      {
 *          "id": "585402ef-68dd-44a4-a44b-04152e659d11",
 *          "email": "donaldtrump@usa.com",
 *          "name": "Donald Trump",
 *          "since": "2018-02-19T14:41:13.000Z"
 *      },
 *      {
 *          "id": "78007a69-baa2-4b24-b936-234883811b6a",
 *          "email": "queenelizabeth@majesty.uk",
 *          "name": "Queen Elizabeth",
 *          "since": "2018-02-19T14:40:14.000Z"
 *      }
 *  ]
 * }
 */
exports.getDoctor = (req, res) => {
    if (req.client) {
        business.patient.find(req.params.id).then(
            patient => {
                if (req.client.constructor.name === "User") business.vitabox.verifyUser(req.client, patient.vitabox_id).then(
                    () => business.patient.getDoctors(patient).then(
                        doctors => res.status(200).json({ doctors: doctors }),
                        error => res.status(error.code).send(error.msg)),
                    error => res.status(error.code).send(error.msg));
                else if (patient.vitabox_id === req.client.id) business.patient.getDoctors(patient).then(
                    doctors => res.status(200).json({ doctors: doctors }),
                    error => res.status(error.code).send(error.msg));
                else res.status(401).send(req.t("unauthorized"));
            }, error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /patient/:id/doctor 04) Remove Doctor
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
                        () => business.user.setHasDoctor(req.client).then(
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
 * @api {get} /patient/:id/board 05) Get Boards
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
