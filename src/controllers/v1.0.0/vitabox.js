var business = require('../../business/index').v1_0_0,
    broker = require("../../brokers/index");
/**
 * @apiDefine box
 * 
 * @apiHeader Accept-Version="1.0.0"
 * @apiHeader Content-Type="application/json"
 * @apiHeader Authorization="< token >"
 * @apiHeader Accept-Language="pt"
 * @apiError {number} statusCode http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} statusMessage error description
 */

/**
 * @api {post} /vitabox 01) Create
 * @apiGroup Vitabox
 * @apiName create
 * @apiDescription create a new vitabox.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiSuccess {string} id created box id
 * @apiSuccess {string} password created box serial key
 */
exports.create = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.vitabox.create().then(
            data => res.status(200).json(data),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /vitabox/:id/register 02) Register
 * @apiGroup Vitabox
 * @apiName vitaboxRegister
 * @apiDescription register vitabox, the user must be authenticated as "admin" and will define the "sponsor" account to the vitabox.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user, admin
 * @apiParam {string} :id vitabox id
 * @apiParam {decimal} latitude min: -90, max: 90 (based on google maps coordinates)
 * @apiParam {decimal} longitude min: -180, max: 180 (based on google maps coordinates)
 * @apiParam {string} address full address with postal code
 * @apiParam {string} email sponsor's email
 * @apiParam {string} password (only to users) vitabox password to register
 * @apiParamExample {json} Request example to admin:
 *     {
 *          "latitude": "38.8976763",
 *          "longitude": "-77.0387185",
 *          "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *          "email": "sponsor@example.com",
 *          "password": "1DlA2.d$"
 *     }
 * @apiSuccess {boolean} result return "true" if was sucessfuly registered
 */
exports.register = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client.admin) {
            business.user.findByEmail(req.body.email).then(
                user => business.vitabox.register(req.params.id, req.body, user, true).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(500).send(error.msg));
        } else {
            business.vitabox.register(req.params.id, req.body, req.client, false).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg));
        }
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /vitabox/:id/connect 03) Request Token
 * @apiGroup Vitabox
 * @apiName vitaboxLogin
 * @apiDescription request for a token to the vitabox
 * @apiVersion 1.0.0
 * @apiHeader Accept-Version="1.0.0"
 * @apiHeader Content-Type="application/json"
 * @apiError {string} error error description
 * 
 * @apiParam {string} :id vitabox id
 * @apiParam {string} password password generated on creation
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 */
exports.requestToken = (req, res) => {
    business.vitabox.requestToken(req.params.id, req.body.password).then(
        data => {
            business.utils.createToken(data).then(
                token => res.status(200).json({ token: token }),
                error => res.status(500).send({ error: error.msg }));
        },
        error => res.status(error.code).send(error.msg)
    );
}

/**
 * @api {get} /vitabox/:own 04) Get info
 * @apiGroup Vitabox
 * @apiName list
 * @apiDescription list all vitaboxes related to the user, or get info from the vitabox itself 
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission any user
 * @apiParam {string} :own (optional just to admin or vitabox) user id indicate to list their own vitaboxes, or vitabox id to get info for itself
 * @apiSuccess {array} vitaboxes list of vitaboxes
 * @apiSuccess {string} id id of each vitabox
 * @apiSuccess {decimal} latitude latitude of each vitabox, min: -90, max: 90 (based on google maps coordinates)
 * @apiSuccess {decimal} longitude longitude of each vitabox, min: -180, max: 180 (based on google maps coordinates)
 * @apiSuccess {string} address full address of each vitabox
 * @apiSuccess {boolean} sponsor flag indicating if the requester is sponsor of that vitabox (only if NOT admin)
 * @apiSuccess {json} settings configuration's structure, defined by vitabox (only if admin)
 * @apiSuccess {boolean} registered flag indicating if the vitabox was already registered (only if admin)
 * @apiSuccess {boolean} active flag indicating if the vitabox was already activated (only if admin)
 * @apiSuccess {string} locality locality tag to get local pharmacies
 * @apiSuccess {string} district district tag to get local pharmacies
 * @apiSuccess {datetime} created_at date of production (only if admin)
 * @apiSuccess {datetime} updated_at date of last update (only if admin)
 * @apiSuccessExample {json} Response example to common user:
 * {
 *  "vitaboxes": [
 *      {
 *          "id": "d1d66ccb-e5a0-4bd4-8580-6218f452e580",
 *          "latitude": "38.8976763",
 *          "longitude": "-77.0387185",
 *          "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *          "sponsor": true,
 *          "active": true
 *          "locality": "tomar",
 *          "district": "santarem"
 *      },
 *      {
 *          "id": "a6abfa76-68f0-4325-b3ab-6c540a800284",
 *          "latitude": "51.5058372",
 *          "longitude": "-0.1899126",
 *          "address": "Kensington Gardens, London W8 4PX, Reino Unido",
 *          "sponsor": false,
 *          "active": false,
 *          "locality": "tomar",
 *          "district": "santarem"
 *      }
 *  ]
 * }
 * @apiSuccessExample {json} Response example to admin:
 * {
 *  "vitaboxes": [
 *      {
 *          "id": "d1d66ccb-e5a0-4bd4-8580-6218f452e580",
 *          "latitude": "38.8976763",
 *          "longitude": "-77.0387185",
 *          "settings":{
 *              "cnfg1": "true",
 *              "cnfg2": "12345",
 *              "cnfg3": "some other config"
 *          },
 *          "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *          "registered": false,
 *          "active": false,
 *          "locality": "tomar",
 *          "district": "santarem"
 *          "created_at": "2018-02-22T11:57:53.000Z",
 *          "updated_at": "2018-02-22T11:57:53.000Z"
 *      }
 *      {
 *          "id": "d1d66ccb-e5a0-4bd4-8580-6218f452e580",
 *          "latitude": "51.5058372",
 *          "longitude": "-0.1899126",
 *          "settings":{
 *              "cnfg1": "true",
 *              "cnfg2": "12345",
 *              "cnfg3": "some other config"
 *          },
 *          "address": "Kensington Gardens, London W8 4PX, Reino Unido",
 *          "registered": false,
 *          "active": false,
 *          "locality": "tomar",
 *          "district": "santarem"
 *          "created_at": "2018-02-22T11:57:53.000Z",
 *          "updated_at": "2018-02-22T11:57:53.000Z"
 *      }
 *  ]
 * }
 * @apiSuccessExample {json} Response example to vitabox:
 * {
 *  "id": "d1d66ccb-e5a0-4bd4-8580-6218f452e580",
 *  "latitude": "38.8976763",
 *  "longitude": "-77.0387185",
 *  "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *  "sponsor": true,
 *  "active": false,
 *  "locality": "tomar",
 *  "district": "santarem"
 * }
 */
exports.list = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.list(req.client, req.params.own).then(
            data => res.status(200).json({ vitaboxes: data }),
            error => res.status(error.code).send(error.msg));
    } else if (req.client && req.client.constructor.name === "Vitabox") {
        business.vitabox.find(req.client.id).then(
            data => res.status(200).json(data),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/settings 05) Get Settings
 * @apiGroup Vitabox
 * @apiName getSettings
 * @apiDescription returns the vitabox settings
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox
 * @apiSuccess {json} settings configuration's structure, defined by vitabox
 * @apiSuccessExample {json} Response example:
 * {
 *      "settings":{
 *          "cnfg1": "true",
 *          "cnfg2": "12345",
 *          "cnfg3": "some other config"
 *      }
 * }
 */
exports.getSettings = (req, res) => {
    if (req.client && req.client.constructor.name === "Vitabox") {
        res.status(200).json({ settings: req.client.settings })
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id/settings 06) Set Settings
 * @apiGroup Vitabox
 * @apiName setSettings
 * @apiDescription update vitabox settings
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox, admin, sponsor
 * @apiParam {json} settings configuration's structure to be updated
 * @apiParamExample {json} Response example:
 * {
 *      "settings":{
 *          "cnfg1": "true",
 *          "cnfg2": "12345",
 *          "cnfg3": "some other config"
 *      }
 * }
 * @apiSuccess {boolean} result return true if was sucessfuly updated
 */
exports.setSettings = (req, res) => {
    if (req.client) {
        if (req.client.constructor.name === "Vitabox")
            req.client.update({ settings: req.body.settings }).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg));
        else if (req.client.admin) business.vitabox.find(req.params.id).then(
            vitabox => vitabox.update({ settings: req.body.settings }).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            res.status(401).send(req.t("unauthorized")));
        else business.vitabox.verifySponsor(req.client, req.params.id).then(
            vitabox => vitabox.update({ settings: req.body.settings }).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            res.status(401).send(req.t("unauthorized")));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id 07) Update
 * @apiGroup Vitabox
 * @apiName update
 * @apiDescription update a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {decimal} latitude min: -90, max: 90 (based on google maps coordinates)
 * @apiParam {decimal} longitude min: -180, max: 180 (based on google maps coordinates)
 * @apiParam {string} address full address with postal code
 * @apiParam {json} settings configuration's structure (only if admin)
 * @apiParamExample {json} Request example to common user:
 *     {
 *          "latitude": "38.8976763",
 *          "longitude": "-77.0387185",
 *          "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA"
 *     }
 * @apiParamExample {json} Request example to admin:
 *     {
 *          "latitude": "38.8976763",
 *          "longitude": "-77.0387185",
 *          "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *          "settings":{
 *              "cnfg1": "true",
 *              "cnfg2": "12345",
 *              "cnfg3": "some other config"
 *          }
 *     }
 * @apiSuccess {boolean} result return true if was sucessfuly updated
 */
exports.update = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.update(req.client, req.params.id, req.body).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /vitabox/:id 08) Delete
 * @apiGroup Vitabox
 * @apiName delete
 * @apiDescription list all users related with the vitabox if the requester is related too.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.delete = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.delete(req.client, req.params.id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {post} /vitabox/:id/user 09) Add User
 * @apiGroup Vitabox
 * @apiName addUser
 * @apiDescription add user to a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} email email of the user to add
 * @apiParam {boolean} sponsor (optional) flag to give the permission as sponsor of the vitabox
 * @apiParamExample {json} Request example:
 *     {
 *          "email": "user-example@some.thing",
 *          "sponsor": false
 *     }
 * @apiSuccessExample {json}Response example:
 * {
 *  "name": "User Name",
 *  "id": "585402ef-68dd-44a4-a44b-04152e659d11"
 * }
 */
exports.addUser = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        let flag = req.body.sponsor ? true : false;
        business.user.findByEmail(req.body.email).then(
            user => business.vitabox.addUser(req.client, req.params.id, user.id, flag).then(
                () => business.warning.setWarningCount(user.id, req.params.id).then(
                    () => broker.notification.update(req.params.id).then(
                        () => res.status(200).json({ name: user.name, id: user.id })),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(500).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/user 10) Get Users
 * @apiGroup Vitabox
 * @apiName getUsers
 * @apiDescription get users of specific vitabox if the requester is related to it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccess {array} users vitabox users list
 * @apiSuccess {string} id id of each user
 * @apiSuccess {string} email email of each user
 * @apiSuccess {datetime} since relationship date with the vitabox
 * @apiSuccess {boolean} sponsor flag indicating if the user is sponsor of the vitabox
 * @apiSuccessExample {json} Response example:
 * {
 *  "users": [
 *      {
 *          "id": "585402ef-68dd-44a4-a44b-04152e659d11",
 *          "email": "donaldtrump@usa.com",
 *          "name": "Donald Trump",
 *          "since": "2018-02-19T14:41:13.000Z",
 *          "sponsor": false
 *      },
 *      {
 *          "id": "78007a69-baa2-4b24-b936-234883811b6a",
 *          "email": "queenelizabeth@majesty.uk",
 *          "name": "Queen Elizabeth",
 *          "since": "2018-02-19T14:40:14.000Z",
 *          "sponsor": true
 *      }
 *  ]
 * }
 */
exports.getUsers = (req, res) => {
    if (req.client) if (req.client.constructor.name === "Vitabox")
        business.vitabox.getUsers(req.client).then(
            data => res.status(200).json({ users: data }),
            error => res.status(error.code).send(error.msg));
    else business.vitabox.find(req.params.id).then(
        vitabox => {
            if (req.client.admin) business.vitabox.getUsers(vitabox).then(
                data => res.status(200).json({ users: data }),
                error => res.status(error.code).send(error.msg));
            else business.vitabox.verifyUser(req.client, vitabox).then(
                () => business.vitabox.getUsers(vitabox).then(
                    data => res.status(200).json({ users: data }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
        }, error => res.status(error.code).send(error.msg))
    else res.status(401).send(req.t("unauthorized"));
}

/**
 * @api {delete} /vitabox/:id/user 11) Remove User
 * @apiGroup Vitabox
 * @apiName removeUser
 * @apiDescription remove user from a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} user_id user unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "user_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.removeUser = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.removeUser(req.client, req.params.id, req.body.user_id).then(
            () => business.warning.removeWarningCount(req.body.user_id, req.params.id).then(
                () => broker.notification.update(req.params.id).then(
                    () => res.status(200).json({ result: true })),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /vitabox/:id/patient 12) Add Patient
 * @apiGroup Vitabox
 * @apiName addPatient
 * @apiDescription add patient to a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission sponsor
 * @apiParam {string} :id vitabox unique ID
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
 *          "nif": "987654321"
 *     }
 * @apiSuccess {string} id new patient id
 */
exports.addPatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.verifySponsor(req.client, req.params.id).then(
            vitabox => business.patient.createIfNotExists(req.body, vitabox.id).then(
                patient => broker.notification.update(req.params.id).then(
                    () => res.status(200).json({ id: patient.id })),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/patient 13) Get Patients
 * @apiGroup Vitabox
 * @apiName getPatients
 * @apiDescription get patients of specific vitabox if the requester is related to it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccess {array} patients vitabox patients list
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
 *                  "since": "2018-07-23T05:15:27.000Z",
 *                  "frequency": 2,
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
 *          ],
 *          "Doctors":[
 *              {
 *                  "id": "950c8b5e-6f43-4686-b21b-a435e96401b7", 
 *                  "name": "Julia Almeida", 
 *                  "email": "jalme@a.aa"
 *              }
 *          ]
 *      }
 *  ]
 * }
 * 
 */
exports.getPatients = (req, res) => {
    if (req.client) if (req.client.constructor.name === "Vitabox")
        business.vitabox.getPatients(req.client, { active: true }).then(
            data => res.status(200).json({ patients: data }),
            error => res.status(error.code).send(error.msg));
    else business.vitabox.find(req.params.id).then(
        vitabox => {
            if (req.client.admin) business.vitabox.getPatients(vitabox, {}).then(
                data => res.status(200).json({ patients: data }),
                error => res.status(error.code).send(error.msg));
            else business.vitabox.verifyUser(req.client, vitabox).then(
                () => business.vitabox.getPatients(vitabox, {}).then(
                    data => res.status(200).json({ patients: data }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
        }, error => res.status(error.code).send(error.msg));
    else res.status(401).send(req.t("unauthorized"));
}

/**
 * @api {put} /vitabox/:id/patient/disable 14) Disable Patient
 * @apiGroup Vitabox
 * @apiName disablePatient
 * @apiDescription disable patient from a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} patient_id patient unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "patient_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * 
 * @apiSuccess {boolean} result return true if was sucessfuly disabled
 */
exports.disablePatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client.admin) business.patient.disable(req.body.patient_id).then(
            () => broker.notification.update(req.params.id).then(
                () => res.status(200).json({ result: true })),
            error => res.status(error.code).send(error.msg));
        else business.vitabox.verifySponsor(req.client, req.params.id).then(
            () => business.patient.disable(req.body.patient_id).then(
                () => broker.notification.update(req.params.id).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg))),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id/patient/enable 15) Enable Patient
 * @apiGroup Vitabox
 * @apiName enablePatient
 * @apiDescription enable patient from a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} patient_id patient unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "patient_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * 
 * @apiSuccess {boolean} result return true if was sucessfuly enabled
 */
exports.enablePatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client.admin) business.patient.enable(req.body.patient_id).then(
            () => broker.notification.update(req.params.id).then(
                () => res.status(200).json({ result: true })),
            error => res.status(error.code).send(error.msg));
        else business.vitabox.verifySponsor(req.client, req.params.id).then(
            () => business.patient.enable(req.body.patient_id).then(
                () => broker.notification.update(req.params.id).then(
                    () => res.status(200).json({ result: true })),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /vitabox/:id/patient 16) Remove Patient
 * @apiGroup Vitabox
 * @apiName removePatient
 * @apiDescription remove a patient from a specific vitabox if the requester is sponsor of it, all the patient records will became unavailable to the users of the vitabox.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} patient_id patient unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "patient_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * 
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.removePatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.verifySponsor(req.client, req.params.id).then(
            vitabox => vitabox.removePatient(req.body.patient_id).then(
                () => broker.record.removeByPatient(req.body.patient_id).then(
                    () => broker.notification.update(req.params.id).then(
                        () => res.status(200).json({ result: true }))),
                error => es.status(500).send(error.message)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /vitabox/:id/board 17) Add Board
 * @apiGroup Vitabox
 * @apiName addBoard
 * @apiDescription add board to a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} description (optional) description to identify the board
 * @apiParam {string} password board password
 * @apiParam {string} mac_address board MAC address
 * @apiParamExample {json} Request example:
 *     {
 *          "description": "kitchen",
 *          "password":"WkN1NNQiRD",
 *          "mac_addr": "00:12:4b:00:06:0d:60:fb"
 *     }
 * @apiSuccess {Object} board return board inserted
 */
exports.addBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.board.authenticate(req.body.mac_addr, req.body.password).then(
            board => business.vitabox.addBoard(req.client, req.params.id, board.id).then(
                () => business.board.setDescription(board, req.body.description ? req.body.description : null).then(
                    () => broker.notification.update(req.params.id).then(
                        () => res.status(200).json({ board: board }))),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/board 18) Get Boards
 * @apiGroup Vitabox
 * @apiName getBoards
 * @apiDescription get boards of specific vitabox if the requester is related to it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccess {array} boards vitabox boards list
 * @apiSuccessExample {json} Response example:
 * {
 *   "boards": [
 *      {
 *          "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *          "description": "kitchen",
 *          "mac_addr": "00:12:4b:00:06:0d:60:c8",
 *          "updated_at": "2018-05-13T14:50:11.000Z",
 *          "active": true,
 *          "node_id": "60c8",
 *          "Boardmodel": {
 *              "id": "17770821-6f5a-41b3-8ea3-d42c000326c6",
 *              "type": "environmental",
 *              "name": "Zolertia RE-Mote",
 *              "tag": "zolertiaremote",
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
 *                      "unit": "%",
 *                      "min_acceptable": "30.00000",
 *                      "max_acceptable": "50.00000",
 *                      "min_possible": "20.00000",
 *                      "max_possible": "60.00000",
 *                      "to_read": "temperature",
 *                      "tag": "humi"
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * }
 */
exports.getBoards = (req, res) => {
    if (req.client) if (req.client.constructor.name === "Vitabox")
        business.vitabox.getBoards(req.client, { active: true }).then(
            data => res.status(200).json({ boards: data }),
            error => res.status(error.code).send(error.msg));
    else business.vitabox.find(req.params.id).then(
        vitabox => {
            if (req.client.admin) business.vitabox.getBoards(vitabox, {}).then(
                data => res.status(200).json({ boards: data }),
                error => res.status(error.code).send(error.msg));
            else business.vitabox.verifyUser(req.client, vitabox).then(
                () => business.vitabox.getBoards(vitabox, {}).then(
                    data => res.status(200).json({ boards: data }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
        }, error => res.status(error.code).send(error.msg));
    else res.status(401).send(req.t("unauthorized"));
}


/**
 * @api {put} /vitabox/:id/board/disable 19) Disable Board
 * @apiGroup Vitabox
 * @apiName disableBoard
 * @apiDescription disable board from a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin, sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} board_id board unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "board_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * 
 * @apiSuccess {boolean} result return true if was sucessfuly disabled
 */
exports.disableBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client.admin) business.board.disable(req.body.board_id).then(
            () => broker.notification.update(req.params.id).then(
                () => res.status(200).json({ result: true })),
            error => res.status(error.code).send(error.msg));
        else business.vitabox.verifySponsor(req.client, req.params.id).then(
            () => business.board.disable(req.body.board_id).then(
                () => broker.notification.update(req.params.id).then(
                    () => res.status(200).json({ result: true })),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id/board/enable 20) Enable Board
 * @apiGroup Vitabox
 * @apiName enableBoard
 * @apiDescription disable board from a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin, sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} board_id board unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "board_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * 
 * @apiSuccess {boolean} result return true if was sucessfuly enabled
 */
exports.enableBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client) business.board.enable(req.body.board_id).then(
            () => broker.notification.update(req.params.id).then(
                () => res.status(200).json({ result: true })),
            error => res.status(error.code).send(error.msg));
        else business.vitabox.verifySponsor(req.client, req.params.id).then(
            () => business.board.enable(req.body.board_id).then(
                () => broker.notification.update(req.params.id).then(
                    () => res.status(200).json({ result: true })),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /vitabox/:id/board 21) Remove Board
 * @apiGroup Vitabox
 * @apiName removeBoard
 * @apiDescription remove a board from a specific vitabox if the requester is sponsor of it, all the board records will became unavailable to the users of the vitabox.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin, sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} board_id board unique ID
 * @apiParamExample {json} Request example:
 *     {
 *          "board_id": "9f846ccb-e5a0-4bd4-94ac-621847dfa780"
 *     }
 * 
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.removeBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client.admin) business.vitabox.find(req.params.id).then(
            vitabox => vitabox.removeBoard(req.body.board_id).then(
                () => business.board.removeDescription(req.body.board_id).then(
                    () => broker.record.removeByBoard(req.body.board_id).then(
                        () => broker.notification.update(req.params.id).then(
                            () => res.status(200).json({ result: true }))),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(500).send(error.message)),
            error => res.status(500).send(error.message));
        else business.vitabox.verifySponsor(req.client, req.params.id).then(
            vitabox => vitabox.removeBoard(req.body.board_id).then(
                () => business.board.removeDescription(req.body.board_id).then(
                    () => broker.record.removeByBoard(req.body.board_id).then(
                        () => broker.notification.update(req.params.id).then(
                            () => res.status(200).json({ result: true }))),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(500).send(error.message)),
            error => res.status(500).send(error.message));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}
