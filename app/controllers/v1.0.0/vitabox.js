var business = require('../../business/index').v1_0_0;
/**
 * @apiDefine box
 * 
 * @apiHeader Accept-Version="1.0.0"
 * @apiHeader Content-Type="application/json"
 * @apiHeader Authorization="< token >"
 * @apiError {number} status http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} error error description
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
exports.create = function (req, res) {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.vitabox.create().then(
            data => res.status(200).json(data),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
 * @apiPermission admin
 * @apiParam {string} :id vitabox id
 * @apiParam {decimal} latitude min: -90, max: 90 (based on google maps coordinates)
 * @apiParam {decimal} longitude min: -180, max: 180 (based on google maps coordinates)
 * @apiParam {string} address full address with postal code
 * @apiParam {string} email sponsor's email
 * @apiParamExample {json} Request example to admin:
 *     {
 *          "latitude": "38.8976763",
 *          "longitude": "-77.0387185",
 *          "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
 *          "email": "sponsor@example.com"
 *     }
 * @apiSuccess {boolean} result return "true" if was sucessfuly registered
 */
exports.register = function (req, res) {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.user.findByEmail(req.body.email).then(
            user => {
                business.vitabox.register(req.params.id, req.body).then(
                    vitabox => {
                        business.vitabox.addUser(req.client, vitabox.id, user.id, true).then(
                            () => res.status(200).json({ result: true }),
                            error => res.status(error.code).send(error.msg));
                    },
                    error => res.status(error.code).send(error.msg));
            },
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
exports.connect = function (req, res) {
    business.vitabox.connect(req.params.id, req.body.password).then(
        data => {
            business.utils.createToken(data, req.connection.remoteAddress).then(
                token => res.status(200).json({ token: token }),
                error => res.status(500).send({ error: error.msg }));
        },
        error => res.status(401).send(error.msg)
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
 *          "sponsor": false
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
exports.list = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.list(req.client).then(
            data => res.status(200).json({ vitaboxes: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
exports.find = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.find(req.client, req.params.id).then(
            data => res.status(200).json({ vitabox: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
exports.getSettings = function (req, res) {
    if (req.client && req.client.constructor.name === "Vitabox") {
        res.status(200).json({ settings: req.client.settings })
    } else {
        res.status(401).send("Unauthorized");
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
exports.setSettings = function (req, res) {
    if (req.client && req.client.constructor.name === "Vitabox") {
        req.client.update({ settings: req.body.settings }).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
exports.update = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.update(req.client, req.params.id, req.body).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
exports.delete = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.delete(req.client, req.params.id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
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
 * @apiParamExample {json} Request example:
 *     {
 *          "email": "user-example@some.thing"
 *     }
 * @apiSuccess {boolean} result return true if was sucessfuly added
 */
exports.addUser = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        let flag = req.body.sponsor ? true : false;
        business.user.findByEmail(req.body.email).then(
            user => business.vitabox.addUser(req.client, req.params.id, user.id, flag).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
 *          "since": "2018-02-19T14:41:13.000Z",
 *          "sponsor": false
 *      },
 *      {
 *          "id": "78007a69-baa2-4b24-b936-234883811b6a",
 *          "email": "queenelizabeth@majesty.uk",
 *          "since": "2018-02-19T14:40:14.000Z",
 *          "sponsor": true
 *      }
 *  ]
 * }
 */
exports.getUsers = function (req, res) {
    if (req.client) {
        business.vitabox.getUsers(req.client.constructor.name === "User", req.client, req.params.id).then(
            data => res.status(200).json({ users: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
exports.removeUser = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.removeUser(req.client, req.params.id, req.body.user_id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
 *          "gender": "male"
 *     }
 * @apiSuccess {boolean} result return true if was sucessfuly added
 */
exports.addPatient = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.patient.create(req.body).then(
            patient => business.vitabox.addPatient(req.client, req.params.id, patient.id).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
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
 * @apiSuccessExample {json} Response example:
 * {
 *  "patients": [
 *      {
 *          "id": "a77ea0fe-5e34-4189-9702-95cb69b4cd1d",
 *          "birthdate": "1987-02-28",
 *          "name": "José António",
 *          "gender": "male",
 *          "since": "2018-02-19T14:55:59.000Z"
 *      }
 *  ]
 * }
 */
exports.getPatients = function (req, res) {
    if (req.client) {
        business.vitabox.getPatients(req.client.constructor.name === "User", req.client, req.params.id).then(
            data => res.status(200).json({ patients: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {delete} /vitabox/:id/patient 15) Remove Patient
 * @apiGroup Vitabox
 * @apiName removePatient
 * @apiDescription remove patient from a specific vitabox if the requester is sponsor of it.
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
exports.removePatient = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.removePatient(req.client, req.params.id, req.body.patient_id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {post} /vitabox/:id/board 16) Add Board
 * @apiGroup Vitabox
 * @apiName addBoard
 * @apiDescription add board to a specific vitabox if the requester is sponsor of it.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox sponsor
 * @apiParam {string} :id vitabox unique ID
 * @apiParam {string} location place where the board is located, if wearable is null
 * @apiParam {string} password board password
 * @apiParam {string} mac_address board MAC address
 * @apiParamExample {json} Request example:
 *     {
 *          "location": "kitchen",
 *          "password":"WkN1NNQiRD",
 *          "mac_addr": "00:12:4b:00:06:0d:60:fb"
 *     }
 * @apiSuccess {boolean} result return true if was sucessfuly added
 */
exports.addBoard = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.board.authenticate(req.body.mac_addr, req.body.password).then(
            board => business.vitabox.addBoard(req.client, req.params.id, board.id).then(
                () => business.board.setLocation(board, req.body.location ? req.body.location : null).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {get} /vitabox/:id/board 17) Get Boards
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
 * @apiSuccess {string} location place where the board is located (house division)
 * @apiSuccess {string} mac_addr board MAC address
 * @apiSuccess {datetime} created_at register day to the vitabox
 * @apiSuccess {json} BoardModel model of each board, contains an id, type and name
 * @apiSuccessExample {json} Response example to user:
 * {
 *  "boards": [
 *      {
 *          "id": "983227e9-e1dc-410e-829d-1636627397ba",
 *          "location": "kitchen",
 *          "mac_addr": "00:19:B9:FB:E2:58",
 *          "created_at": "2018-02-22T15:25:50.000Z",
 *          "BoardModel": {
 *              "id": "1920ed05-0a24-4611-b822-5da7a58ba8bb",
 *              "type": "environmental",
 *              "name": "Zolertia RE-Mote",
 *              "Sensors": [
 *                  {
 *                      "id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *                      "transducer": "dht22",
 *                      "measure": "temperature",
 *                      "min_acceptable": "10.00000",
 *                      "max_acceptable": "25.00000",
 *                      "min_possible": "-20.00000",
 *                      "max_possible": "50.00000"
 *                  }
 *              ]
 *          }
 *      }
 *  ]
 * }
 * @apiSuccessExample {json} Response example to vitabox:
 * {
 *  "boards": [
 *      {
 *          "id": "983227e9-e1dc-410e-829d-1636627397ba",
 *          "location": "kitchen",
 *          "mac_addr": "00:19:B9:FB:E2:58",
 *          "created_at": "2018-02-22T15:25:50.000Z",
 *          "node_id": "E258"
 *          "BoardModel": {
 *              "id": "1920ed05-0a24-4611-b822-5da7a58ba8bb",
 *              "type": "environmental",
 *              "name": "Zolertia RE-Mote",
 *              "Sensors": [
 *                  {
 *                      "id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *                      "transducer": "dht22",
 *                      "measure": "temperature",
 *                      "min_acceptable": "10.00000",
 *                      "max_acceptable": "25.00000",
 *                      "min_possible": "-20.00000",
 *                      "max_possible": "50.00000"
 *                  }
 *              ]
 *          }
 *      }
 *  ]
 * }
 */
exports.getBoards = function (req, res) {
    if (req.client) {
        business.vitabox.getBoards(req.client.constructor.name === "User", req.client, req.params.id).then(
            data => res.status(200).json({ boards: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {delete} /vitabox/:id/patient 18) Remove Board
 * @apiGroup Vitabox
 * @apiName removeBoard
 * @apiDescription remove board from a specific vitabox if the requester is sponsor of it.
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
exports.removeBoard = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.vitabox.removeBoard(req.client, req.params.id, req.body.board_id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}