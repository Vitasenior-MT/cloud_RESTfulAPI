var business = require('../../business/index').v1_0_0,
    worker = require('../../workers/index');
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
 * @api {get} /vitabox 04) List
 * @apiGroup Vitabox
 * @apiName list
 * @apiDescription list all vitaboxes related to the user. 
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission any user
 * @apiSuccess {array} vitaboxes list of vitaboxes
 * @apiSuccess {string} id id of each vitabox
 * @apiSuccess {decimal} latitude latitude of each vitabox, min: -90, max: 90 (based on google maps coordinates)
 * @apiSuccess {decimal} longitude longitude of each vitabox, min: -180, max: 180 (based on google maps coordinates)
 * @apiSuccess {string} address full address of each vitabox
 * @apiSuccess {boolean} sponsor flag indicating if the requester is sponsor of that vitabox (only if NOT admin)
 * @apiSuccess {json} settings configuration's structure, defined by vitabox (only if admin)
 * @apiSuccess {boolean} registered flag indicating if the vitabox was already registered (only if admin)
 * @apiSuccess {boolean} active flag indicating if the vitabox was already activated (only if admin)
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
 *          "sponsor": true
 *      },
 *      {
 *          "id": "a6abfa76-68f0-4325-b3ab-6c540a800284",
 *          "latitude": "51.5058372",
 *          "longitude": "-0.1899126",
 *          "address": "Kensington Gardens, London W8 4PX, Reino Unido",
 *          "sponsor": false,
 *          "active": false,
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
 *          "created_at": "2018-02-22T11:57:53.000Z",
 *          "updated_at": "2018-02-22T11:57:53.000Z"
 *      }
 *  ]
 * }
 */
exports.list = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.list(req.client).then(
            data => res.status(200).json({ vitaboxes: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id 05) Find
 * @apiGroup Vitabox
 * @apiName find
 * @apiDescription find a specific vitabox if the requester is related to it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccess {string} id vitabox unique ID
 * @apiSuccess {decimal} latitude vitabox latitude, min: -90, max: 90 (based on google maps coordinates)
 * @apiSuccess {decimal} longitude vitabox longitude, min: -180, max: 180 (based on google maps coordinates)
 * @apiSuccess {string} address vitabox full address 
 * @apiSuccess {boolean} sponsor flag indicating if the requester is sponsor of that vitabox (only if NOT admin)
 * @apiSuccess {json} settings configuration's structure, defined by vitabox (only if admin)
 * @apiSuccess {boolean} registered flag indicating if the vitabox was already registered (only if admin)
 * @apiSuccess {boolean} active flag indicating if the vitabox was already activated (only if admin)
 * @apiSuccess {datetime} created_at date of production (only if admin)
 * @apiSuccess {datetime} updated_at date of last update (only if admin)
 * @apiSuccessExample {json} Response example to common user:
 * {
 *  "vitabox": {
 *      "id": "d1d66ccb-e5a0-4bd4-8580-6218f452e580",
 *      "latitude": "38.8976763",
 *      "longitude": "-77.0387185",
 *      "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *      "sponsor": false
 *  }
 * }
 * @apiSuccessExample {json} Response example to admin:
 * {
 *  "vitabox": {
 *      "id": "d1d66ccb-e5a0-4bd4-8580-6218f452e580",
 *      "latitude": "38.8976763",
 *      "longitude": "-77.0387185",
 *      "settings":{
 *          "cnfg1": "true",
 *          "cnfg2": "12345",
 *          "cnfg3": "some other config"
 *      },
 *      "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *      "created_at": "2018-02-19T11:38:32.000Z",
 *      "updated_at": "2018-02-23T16:12:47.000Z"
 *  }
 * }
 */
exports.find = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.find(req.client, req.params.id).then(
            data => res.status(200).json({ vitabox: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /settings/vitabox 06) Get Settings
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
 * @api {put} /settings/vitabox 07) Set Settings
 * @apiGroup Vitabox
 * @apiName setSettings
 * @apiDescription update vitabox settings
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox
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
    if (req.client && req.client.constructor.name === "Vitabox") {
        req.client.update({ settings: req.body.settings }).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id 08) Update
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
 * @api {delete} /vitabox/:id 09) Delete
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
 * @api {post} /vitabox/:id/user 10) Add User
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
 * @apiSuccess {boolean} result return true if was sucessfuly added
 */
exports.addUser = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        let flag = req.body.sponsor ? true : false;
        business.user.findByEmail(req.body.email).then(
            user => business.vitabox.addUser(req.client, req.params.id, user.id, flag).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(500).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/user 11) Get Users
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
    if (req.client) {
        business.vitabox.getUsers(req.client.constructor.name === "User", req.client, req.params.id).then(
            data => res.status(200).json({ users: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /vitabox/:id/user 12) Remove User
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
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /vitabox/:id/patient 13) Add Patient
 * @apiGroup Vitabox
 * @apiName addPatient
 * @apiDescription add patient to a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} name patient name
 * @apiParam {date} birthdate patient birthdate (date only)
 * @apiParam {string} gender patient gender (must be 'male', 'female' or 'undefined')
 * @apiParamExample {json} Request example:
 *     {
 *          "name": "José António",
 *          "birthdate": "1987-02-28",
 *          "gender": "male",
 *          "height": 1.72,
 *          "weight": 78.2
 *     }
 * @apiSuccess {string} id new patient id
 */
exports.addPatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.createIfNotExists(req.body).then(
            patient => business.vitabox.addPatient(req.client, req.params.id, patient.id).then(
                () => res.status(200).json({ id: patient.id }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/patient 14) Get Patients
 * @apiGroup Vitabox
 * @apiName getPatients
 * @apiDescription get patients of specific vitabox if the requester is related to it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccess {array} patients vitabox patients list
 * @apiSuccess {string} id id of each patient
 * @apiSuccess {date} birthdate patient birthdate (date only)
 * @apiSuccess {string} name name of each patient
 * @apiSuccess {string} gender patient gender (must be 'male', 'female' or 'undefined')
 * @apiSuccess {datetime} since relationship date with the vitabox 
 * @apiSuccessExample {json} Response example to admin:
 * {
 *  "patients": [
 *      {
 *          "id": "a77ea0fe-5e34-4189-9702-95cb69b4cd1d",
 *          "birthdate": "1987-02-28",
 *          "name": "José António",
 *          "gender": "male",
 *          "active": true,
 *          "since": "2018-02-19T14:55:59.000Z"
 *          "weight": 79.6,
 *          "height": 1.74,
 *  ]
 * }
 * @apiSuccessExample {json} Response example to vitabox:
 * {
 *  "patients": [
 *      {
 *          "id": "a77ea0fe-5e34-4189-9702-95cb69b4cd1d",
 *          "birthdate": "1987-02-28",
 *          "name": "José António",
 *          "gender": "male",
 *          "since": "2018-02-19T14:55:59.000Z",
 *          "weight": 79.6,
 *          "height": 1.74,
 *          "Boards": [
 *              {
 *                  "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *                  "description": "kitchen",
 *                  "mac_addr": "00:12:4b:00:06:0d:60:c8",
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
 *                              "tag": "humi",
 *                              "to_read": "temperature"
 *                          }
 *                      }
 *                  ]
 *              }
 *          ],
 *          "Profiles":[
 *              {"id": "950c8b5e-6f43-4686-b21b-a435e96401b7", "measure": "body fat", "tag": "bodyfat", "min": 19, "max": 25},
 *              {"id": "32443b5e-28cd-ab43-b86b-a423442401b8", "measure": "weight", "tag": "weight", "min": 58, "max": 64}
 *          ]
 *      }
 *  ]
 * }
 * @apiSuccessExample {json} Response example to users:
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
 *          "Boards": [
 *              {
 *                  "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *                  "description": "kitchen",
 *                  "mac_addr": "00:12:4b:00:06:0d:60:c8",
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
 *                              "unit": "%",
 *                              "min_acceptable": "30.00000",
 *                              "max_acceptable": "50.00000",
 *                              "min_possible": "20.00000",
 *                              "max_possible": "60.00000",
 *                              "to_read": "temperature"
 *                          }
 *                      }
 *                  ]
 *              }
 *          ],
 *          "Profiles":[
 *              {"id": "950c8b5e-6f43-4686-b21b-a435e96401b7", "measure": "body fat", "tag": "bodyfat", "min": 19, "max": 25},
 *              {"id": "32443b5e-28cd-ab43-b86b-a423442401b8", "measure": "weight", "tag": "weight", "min": 58, "max": 64}
 *          ],
 *          "Doctors":[
 *              {"id": "950c8b5e-6f43-4686-b21b-a435e96401b7", "name": "Julia Almeida", email: "jalme@a.aa"}
 *          ]
 *      }
 *  ]
 * }
 * 
 */
exports.getPatients = (req, res) => {
    if (req.client) {
        business.vitabox.getPatients(req.client.constructor.name === "User", req.client, req.params.id).then(
            data => res.status(200).json({ patients: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id/patient/disable 15) Disable Patient
 * @apiGroup Vitabox
 * @apiName disablePatient
 * @apiDescription disable patient from a specific vitabox if the requester is sponsor of it.
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
 * @apiSuccess {boolean} result return true if was sucessfuly disabled
 */
exports.disablePatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client.admin) {
            business.patient.disable(req.body.patient_id).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg));
        } else {
            business.vitabox.verifySponsor(req.client, req.params.id).then(
                () => business.patient.disable(req.body.patient_id).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
        }
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id/patient/enable 16) Enable Patient
 * @apiGroup Vitabox
 * @apiName enablePatient
 * @apiDescription enable patient from a specific vitabox if the requester is sponsor of it.
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
 * @apiSuccess {boolean} result return true if was sucessfuly enabled
 */
exports.enablePatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        if (req.client.admin) {
            business.patient.enable(req.body.patient_id).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg));
        } else {
            business.vitabox.verifySponsor(req.client, req.params.id).then(
                () => business.patient.enable(req.body.patient_id).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
        }
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /vitabox/:id/patient 17) Remove Patient
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
        business.vitabox.removePatient(req.client, req.params.id, req.body.patient_id).then(
            () => business.record.withdrawsAccess({ 'patient_id': req.body.patient_id }).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {post} /vitabox/:id/board 18) Add Board
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
            board => {
                business.vitabox.addBoard(req.client, req.params.id, board.id).then(
                    () => business.board.setDescription(board, req.body.description ? req.body.description : null).then(
                        () => res.status(200).json({ board: board }),
                        error => res.status(error.code).send(error.msg)),
                    error => res.status(error.code).send(error.msg))
            },
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/board 19) Get Boards
 * @apiGroup Vitabox
 * @apiName getBoards
 * @apiDescription get boards of specific vitabox if the requester is related to it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccess {array} boards vitabox boards list
 * @apiSuccess {string} id id of each board
 * @apiSuccess {string} description  description to identify the board
 * @apiSuccess {string} mac_addr board MAC address
 * @apiSuccess {boolean} active status of the board, only to admin, the other users will only receive boards with "is_active=true"
 * @apiSuccess {datetime} updated_at last update time
 * @apiSuccess {json} BoardModel model of each board, contains an id, type and name, the vitabox itself wiil receive the transdutors list of each model
 * @apiSuccessExample {json} Response example to admin:
 * {
 *  "boards": [
 *      {
 *          "id": "983227e9-e1dc-410e-829d-1636627397ba",
 *          "description": "kitchen",
 *          "mac_addr": "00:19:B9:FB:E2:58",
 *          "active": false,
 *          "updated_at": "2018-02-22T15:25:50.000Z",
 *          "Boardmodel": {
 *              "id": "1920ed05-0a24-4611-b822-5da7a58ba8bb",
 *              "type": "environmental",
 *              "name": "Zolertia RE-Mote"
 *          }
 *      }
 *  ]
 * }
 * @apiSuccessExample {json} Response example to vitabox:
 * {
 *  "boards": [
 *      {
 *          "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *          "description": "kitchen",
 *          "mac_addr": "00:12:4b:00:06:0d:60:c8",
 *          "node_id": "60c8",
 *          "updated_at": "2018-05-13T14:50:11.000Z",
 *          "Boardmodel": {
 *              "id": "17770821-6f5a-41b3-8ea3-d42c000326c6",
 *              "type": "environmental",
 *              "name": "Zolertia RE-Mote",
 *              "tag": null
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
 *                      "max_possible": "60.00000".
 *                      "tag": "humid",
 *                      "to_read": "temperature"
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * }
 * @apiSuccessExample {json} Response example to user:
 * {
 *   "boards": [
 *      {
 *          "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *          "description": "kitchen",
 *          "mac_addr": "00:12:4b:00:06:0d:60:c8",
 *          "updated_at": "2018-05-13T14:50:11.000Z",
 *          "active": true,
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
 *                      "unit": "%",
 *                      "min_acceptable": "30.00000",
 *                      "max_acceptable": "50.00000",
 *                      "min_possible": "20.00000",
 *                      "max_possible": "60.00000",
 *                      "to_read": "temperature"
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * }
 */
exports.getBoards = (req, res) => {
    if (req.client) {
        business.vitabox.getBoards(req.client.constructor.name === "User", req.client, req.params.id).then(
            data => res.status(200).json({ boards: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id/board/disable 20) Disable Board
 * @apiGroup Vitabox
 * @apiName disableBoard
 * @apiDescription disable board from a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
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
        if (req.client.admin) {
            business.board.disable(req.body.board_id).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg));
        } else {
            business.vitabox.verifySponsor(req.client, req.params.id).then(
                () => business.board.disable(req.body.board_id).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
        }
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:id/board/enable 21) Enable Board
 * @apiGroup Vitabox
 * @apiName enableBoard
 * @apiDescription disable board from a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
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
        if (req.client.admin) {
            business.board.enable(req.body.board_id).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg));
        } else {
            business.vitabox.verifySponsor(req.client, req.params.id).then(
                () => business.board.enable(req.body.board_id).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
        }
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /vitabox/:id/board 22) Remove Board
 * @apiGroup Vitabox
 * @apiName removeBoard
 * @apiDescription remove a board from a specific vitabox if the requester is sponsor of it, all the board records will became unavailable to the users of the vitabox.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
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
        business.vitabox.removeBoard(req.client, req.params.id, req.body.board_id).then(
            () => business.board.removeDescription(req.body.board_id).then(
                () => worker.record.remove(req.body.board_id).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /vitabox/:id/warning 23) Get warning
 * @apiGroup Vitabox
 * @apiName getWarnings
 * @apiDescription get all warnings from vitabox
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox, vitabox user, admin
 * @apiParam {string} :id vitabox unique ID
 * @apiSuccessExample {json} Response example:
 * {
 *  "warnings":[]
 * }
 */
exports.getWarnings = (req, res) => {
    if (req.client) {
        if (req.client.admin) business.warning.getByVitabox(req.params.id).then(
            data => res.status(200).json({
                warnings: data.map(x => {
                    return {
                        "id": x._id,
                        "message": req.t(x.message, req.t(x.what), req.t(x.who)),
                        "sensor_id": x.sensor_id,
                        "patient_id": x.patient_id,
                        "seen_date": x.seen_date,
                        "seen_user": x.seen_user,
                        "seen_vitabox": x.seen_vitabox,
                    }
                })
            }), error => res.status(error.code).send(error.msg));
        else if (req.client.constructor.name === "Vitabox" && req.client.id === req.params.id) {
            business.warning.getFromVitabox(req.params.id).then(
                data => res.status(200).json({
                    warnings: data.map(x => {
                        return {
                            "id": x._id,
                            "message": req.t(x.message, req.t(x.what), req.t(x.who)),
                            "sensor_id": x.sensor_id,
                            "patient_id": x.patient_id,
                            "seen_date": x.seen_date,
                            "seen_user": x.seen_user,
                            "seen_vitabox": x.seen_vitabox,
                        }
                    })
                }), error => res.status(error.code).send(error.msg));
        } else business.vitabox.verifyUser(req.client, req.params.id).then(
            () => business.warning.getByVitabox(req.params.id).then(
                data => res.status(200).json({
                    warnings: data.map(x => {
                        return {
                            "id": x._id,
                            "message": req.t(x.message, req.t(x.what), req.t(x.who)),
                            "sensor_id": x.sensor_id,
                            "patient_id": x.patient_id,
                            "seen_date": x.seen_date,
                            "seen_user": x.seen_user,
                            "seen_vitabox": x.seen_vitabox,
                        }
                    })
                }), error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /vitabox/:vid/warning/:wid 24) Check warning
 * @apiGroup Vitabox
 * @apiName checkWarnings
 * @apiDescription check warning from vitabox
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox user
 * @apiParam {string} :vid vitabox unique ID
 * @apiParam {string} :wid vitabox unique ID
 * @apiSuccess {boolean} result return true if was sucessfuly updated
 */
exports.checkWarnings = (req, res) => {
    if (req.client) {
        if (req.client.constructor.name === "Vitabox" && req.client.id === req.params.vid)
            business.warning.setCheckByVitabox(req.params.wid).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg));
        else business.vitabox.verifyUser(req.client, req.params.vid).then(
            () => business.warning.setCheckByUser(req.params.wid, req.client.id).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}