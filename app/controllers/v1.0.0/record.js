var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /record 1) Receive
 * @apiGroup Record
 * @apiName createRecord
 * @apiDescription receive data from vitabox about it sensors
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox
 * @apiParam {decimal} value value catched
 * @apiParam {datetime} datetime moment when the value was catched
 * @apiParam {string} patient_id patient unique ID related to the value, may be null or omitted
 * @apiParam {string} board_id board unique ID related to the value
 * @apiParam {string} sensor_id sensor unique ID related to the value
 * @apiParamExample {json} Request example:
 * {
 *  "records":[
 *      {
 *          "value": 10,
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      },
 *      {
 *          "value": 13,
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 * @apiSuccess {boolean} result return true if was sucessfuly recorded
 * @apiSuccess {string} error return "" if all records were valid and a error message if some records has invalid parameters
 * @apiSuccessExample {json} Response example:
 * {
 *  "result":true,
 *  "error": "some records were discarded by invalid parameters: value, datetime, sensor_id and board_id are required"
 * }
 */
exports.create = (req, res) => {
    if (req.client && req.client.constructor.name === "Vitabox") {
        business.record.create(req.body.records).then(
            invalid => {
                if (invalid) res.status(200).json({ result: true, error: "some records were discarded by invalid parameters, value, datetime, sensor_id and board_id are required" });
                else res.status(200).json({ result: true, error: "" });
            },
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {get} /record/patient/:id 2) List by Patient
 * @apiGroup Record
 * @apiName listRecordsByPatient
 * @apiDescription list all records by patient
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id patient unique ID
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {string} patient_id patient unique ID related to the value
 * @apiSuccess {string} board_id board unique ID related to the value
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 */
exports.listByPatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.record.listByPatient(req.client, req.params.id).then(
            data => res.status(200).json({ records: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {get} /record/board/:id 3) List by Board
 * @apiGroup Record
 * @apiName listRecordsByBoard
 * @apiDescription list all records by board
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id board unique ID
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {string} patient_id patient unique ID related to the value
 * @apiSuccess {string} board_id board unique ID related to the value
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 */
exports.listByBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.record.listByBoard(req.client, req.params.id).then(
            data => res.status(200).json({ records: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {get} /record/sensor/:id 4) List by Sensor
 * @apiGroup Record
 * @apiName listRecordsBySensor
 * @apiDescription list all records by sensor
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id sensor unique ID
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {string} patient_id patient unique ID related to the value
 * @apiSuccess {string} board_id board unique ID related to the value
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "patient_id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *          "board_id": "f2340471-23e2-4891-bb89-14888abcc29e",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 */
exports.listBySensor = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.record.listBySensor(req.client, req.params.id).then(
            data => res.status(200).json({ records: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}