var business = require('../../business/index').v1_0_0,
    broker = require('../../brokers/index');

/**
 * @api {post} /board 01) Create Board
 * @apiGroup Board
 * @apiName createBoard
 * @apiDescription register a new board on the system
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} model model id of the board
 * @apiParam {string} mac_address board MAC address
 * @apiParamExample {json} Request example:
 *     {
 *          "model":"5d93585b-f511-4fa8-b69e-692c2474d5e8",
 *          "mac_addr": "00:12:4b:00:06:0d:60:fb"
 *     }
 * @apiSuccess {string} id return the id
 * @apiSuccess {string} mac_addr return the mac address
 * @apiSuccess {string} password return the generated password
 * @apiSuccessExample {json} Response example:
 *     {
 *          "id":"c293462b-fac1-4f67-b69e-47841274d5e8",
 *          "mac_addr": "00:12:4b:00:06:0d:60:fb",
 *          "password": "aj34Ah1DA1"
 *     }
 */
exports.create = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.board.create(req.body).then(
            obj => {
                business.sensor.create(obj.board.id, req.body.model).then(
                    () => res.status(200).json({ id: obj.board.id, mac_addr: obj.board.mac_addr, password: obj.password }),
                    error => res.status(error.code).send(error.msg));
            }, error => res.status(error.code).send(error.msg));
    } else { res.status(401).send("Unauthorized"); }
}


/**
 * @api {put} /board/:id 02) Change MAC
 * @apiGroup Board
 * @apiName exchangeBoard
 * @apiDescription alter MAC address to board exchange
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} id board id to exchange
 * @apiParamExample {json} Request example:
 *     {
 *          "mac_addr":"5d93585b-f511-4fa8-b69e-692c2474d5e8"
 *     }
 * @apiSuccess {booleam} result returns true if was successfuly updated
 */
exports.exchange = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.board.switchMac(req.params.id, req.body.mac_addr).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send("Unauthorized"); }
}

/**
 * @api {get} /board/:id 03) Get Board
 * @apiGroup Board
 * @apiName getBoardById
 * @apiDescription get Board
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id model id of the board
 * @apiSuccessExample {json} Response example:
 * {
    "board": {
        "id": "6b6899af-89bf-453b-a0ce-52523bb6aefd",
        "mac_addr": "45:44:54:65:65:16:51:31",
        "Boardmodel": {
            "id": "c5e10ee8-9d80-43e0-af6c-29e95a0ca66e",
            "type": "non-wearable",
            "name": "MySignals Blood Pressure"
        },
        "Sensors": [
            {
                "id": "9cd77116-6edb-4072-9d66-204fca3d5a07",
                "last_commit": "2018-07-23T05:15:27.000Z",
                "last_values": [  17, 16, 13, 16, 15 ],
                "Sensormodel": {
                    "id": "1f8eab67-d39e-439e-b508-6ef6f2c6794a",
                    "transducer": "dht22",
                    "measure": "humidity",
                    "min_acceptable": "30.00000",
                    "max_acceptable": "50.00000",
                    "min_possible": "20.00000",
                    "max_possible": "60.00000"
                }
            }
        ]
    }
  }
 */
exports.getById = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.board.get(req.params.id).then(
            obj => res.status(200).json({ board: obj }),
            error => res.status(error.code).send(error.msg));
    } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {post} /board/:id/patient 04) Add Patient
 * @apiGroup Board
 * @apiName addPatientToBoard
 * @apiDescription Associate a patient with a board
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin, sponsor
 * @apiParam {string} patient_id patient id to add
 * @apiParamExample {json} Request example:
 *     {
 *          "patient_id":"5d93585b-f511-4fa8-b69e-692c2474d5e8"
 *     }
 * @apiSuccess {booleam} result returns true if was successfuly added
 */
exports.addPatientToBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.board.get(req.params.id).then(
            board => {
                if (req.client.admin) business.board.addPatient(board, req.body.patient_id).then(
                    () => Promise.all(board.Sensors.map(x => business.profile.create({
                        patient_id: req.body.patient_id,
                        min: x.Sensormodel.min_acceptable,
                        max: x.Sensormodel.max_acceptable,
                        tag: x.Sensormodel.tag,
                        measure: x.Sensormodel.measure
                    }))).then(
                        () => res.status(200).json({ result: true }),
                        error => res.status(500).send("could not set patient profile")),
                    error => res.status(error.code).send(error.msg));
                else business.vitabox.verifySponsor(req.client, board.vitabox_id).then(
                    vitabox => business.board.addPatient(board, req.body.patient_id).then(
                        () => Promise.all(board.Sensors.map(x => business.profile.create({
                            patient_id: req.body.patient_id,
                            min: x.Sensormodel.min_acceptable,
                            max: x.Sensormodel.max_acceptable,
                            tag: x.Sensormodel.tag,
                            measure: x.Sensormodel.measure
                        }))).then(
                            () => res.status(200).json({ result: true }),
                            error => res.status(500).send("could not set patient profile")),
                        error => res.status(error.code).send(error.msg)),
                    error => res.status(error.code).send(error.msg))
            }, error => res.status(error.code).send(error.msg));
    } else res.status(401).send(req.t("unauthorized"));
}

/**
 * @api {delete} /board/:id/patient 05) Remove Patient
 * @apiGroup Board
 * @apiName removePatientFromBoard
 * @apiDescription Disassociate a patient from a board
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin, sponsor
 * @apiParam {string} patient_id patient id to add
 * @apiParamExample {json} Request example:
 *     {
 *          "patient_id":"5d93585b-f511-4fa8-b69e-692c2474d5e8"
 *     }
 * @apiSuccess {booleam} result returns true if was successfuly removed
 */
exports.removePatientFromBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.board.get(req.params.id).then(
            board => {
                if (req.client.admin) board.removePatient(req.body.patient_id).then(
                    () => Promise.all(board.Sensors.map(x => business.profile.remove(req.body.patient_id, x.Sensormodel.tag))).then(
                        () => broker.record.removeByBoardPatient(req.body.patient_id, req.params.id).then(
                            () => res.status(200).json({ result: true }),
                            error => res.status(error.code).send(error.msg)),
                        error => res.status(500).send("could not remove patient profile")),
                    error => res.status(500).send(error.message));
                else business.vitabox.verifySponsor(req.client, board.vitabox_id).then(
                    () => board.removePatient(req.body.patient_id).then(
                        () => Promise.all(board.Sensors.map(x => business.profile.remove(req.body.patient_id, x.Sensormodel.tag))).then(
                            () => broker.record.removeByBoardPatient(req.body.patient_id, req.params.id).then(
                                () => res.status(200).json({ result: true }),
                                error => res.status(error.code).send(error.msg)),
                            error => res.status(500).send("could not remove patient profile")),
                        error => res.status(500).send(error.message)),
                    error => res.status(error.code).send(error.msg))
            }, error => res.status(error.code).send(error.msg));
    } else res.status(401).send(req.t("unauthorized"));
}

/**
 * @api {get} /board/:id/sensor 06) Get Sensors
 * @apiGroup Board
 * @apiName getSensorsFromBoard
 * @apiDescription Get sensors from a board
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id board id
 * @apiSuccessExample {json} Response example:
 * {
    "sensors": [
        {
            "id": "9cd77116-6edb-4072-9d66-204fca3d5a07",
            "last_commit": "2018-07-23T05:15:27.000Z",
            "last_values": [  17, 16, 13, 16, 15 ],
            "Sensormodel": {
                "id": "1f8eab67-d39e-439e-b508-6ef6f2c6794a",
                "transducer": "dht22",
                "measure": "humidity",
                "min_acceptable": "30.00000",
                "max_acceptable": "50.00000",
                "min_possible": "20.00000",
                "max_possible": "60.00000"
            }
        }
    ]
}
 */
exports.getSensorsFromBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.board.getSensors(req.params.id).then(
            sensors => res.status(200).json({ sensors: sensors }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}