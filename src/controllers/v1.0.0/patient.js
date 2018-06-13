var business = require('../../business/index').v1_0_0;

/**
 * @api {post} patient/:id/profile 01) Add profiles
 * @apiGroup Patient
 * @apiName setProfilesToPatient
 * @apiDescription add profiles to patient.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id patient id
 * @apiParam {array} profiles profiles array to add
 * @apiParam {string} measure sensor model measure
 * @apiParam {string} tag sensor model tag
 * @apiParam {decimal} min minimum value acceptable
 * @apiParam {decimal} max maximum value acceptable
 * @apiSuccess {object} profiles created profiles
 * @apiSuccessExample {json} Response example:
 * {
 * profiles: [
 *  {  
 *      tag: 'bodyfat',
        min: '19',
        max: '25',
        measure: 'body fat',
        patient_id: '61795ea7-4cca-4658-ab98-e913d465ea74',
        id: 'ac115530-b06c-42b0-a897-06fe5a088d2b',
        created_at: 2018-06-12T14:59:43.679Z,
        updated_at: 2018-06-12T14:59:43.679Z 
    },
    { 
        tag: 'bodyfat',
        min: '19',
        max: '25',
        measure: 'body fat',
        patient_id: '61795ea7-4cca-4658-ab98-e913d465ea74',
        id: 'ac115530-b06c-42b0-a897-06fe5a043354',
        created_at: 2018-06-12T14:59:43.679Z,
        updated_at: 2018-06-12T14:59:43.679Z 
    }
    ]
}
 */
exports.setProfiles = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.find(req.params.id).then(
            patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                () => {
                    let promises = req.body.profiles.map(profile => {
                        return business.profile.create(patient.id, profile);
                    });
                    Promise.all(promises).then(
                        profiles => res.status(200).json({ profiles: profiles.filter(x => x !== null) }),
                        error => res.status(500).send("cannot create profiles"));
                }, error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {put} patient/:paid/profile/:prid 02) Update profile
 * @apiGroup Patient
 * @apiName updateProfilesToPatient
 * @apiDescription update profile from patient.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :paid patient id
 * @apiParam {string} :prid profile id to update
 * @apiParam {string} measure sensor model measure
 * @apiParam {string} tag sensor model tag
 * @apiParam {decimal} min minimum value acceptable
 * @apiParam {decimal} max maximum value acceptable
 * @apiSuccess {boolean} result returns true if was successfuly updated
 */
exports.updateProfile = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.find(req.params.paid).then(
            patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                () => business.profile.update(req.params.prid, req.body).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(500).send("cannot create profiles")),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {delete} patient/:paid/profile/:prid 03) Remove profile
 * @apiGroup Patient
 * @apiName removeProfilesToPatient
 * @apiDescription remove profile from patient.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :paid patient id
 * @apiParam {string} :prid profile id to remove
 * @apiSuccess {boolean} result returns true if was successfuly removed
 */
exports.removeProfile = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.find(req.params.paid).then(
            patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                () => business.profile.remove(req.params.prid).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(500).send("cannot create profiles")),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
 * @apiSuccess {boolean} result return true if was sucessfuly added
 */
exports.addDoctor = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.user.findByEmail(req.body.email).then(
            user => business.patient.find(req.params.id).then(
                patient => business.vitabox.verifySponsor(req.client, patient.vitabox_id).then(
                    () => business.patient.addDoctor(patient, user.id).then(
                        () => business.user.setHasDoctor(user).then(
                            () => res.status(200).json({ result: true }),
                            error => res.status(error.code).send(error.msg)),
                        error => res.status(error.code).send(error.msg)),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {get} /patient/:id/doctor 05) Get Doctors
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
                else res.status(401).send("Unauthorized");
            }, error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
                    () => business.user.setHasDoctor(req.client).then(
                        () => res.status(200).json({ result: true }),
                        error => res.status(error.code).send(error.msg)),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
        res.status(401).send("Unauthorized");
    }
}