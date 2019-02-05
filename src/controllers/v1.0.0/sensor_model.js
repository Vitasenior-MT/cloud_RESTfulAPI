var business = require('../../business/index').v1_0_0,
    broker = require("../../brokers/index");

/**
 * @api {post} /sensormodel 01) Create
 * @apiGroup Sensormodel
 * @apiName createSensormodel
 * @apiDescription create a new sensor.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} transducer transducer name
 * @apiParam {string} measure transducer measure
 * @apiParam {string} unit transducer measurement unit
 * @apiParam {string} tag transducer tag
 * @apiParam {decimal} min_acceptable minimum acceptable value to sensor
 * @apiParam {decimal} max_acceptable maximum acceptable value to sensor
 * @apiParam {decimal} min_possible minimum possible value to sensor
 * @apiParam {decimal} max_possible maximum possible value to sensor
 * @apiParam {decimal} min_graph minimum value to graph thresholds
 * @apiParam {decimal} max_graph maximum value to graph thresholds
 * @apiParam {string} to_read text to text-to-speech
 * @apiParamExample {json} Request example:
 *      {
 *           "transducer": "dht22",
 *           "measure":"temperature",
 *           "unit": "ºC",
 *           "tag": "temp",
 *           "min_acceptable": "10",
 *           "max_acceptable": "25",
 *           "min_possible": "-20",
 *           "max_possible": "50",
 *           "to_read": "temperature",
 *           "min_graph": "0",
 *           "max_graph": "13",
 *      }
 * @apiSuccess {string} id created sensor id
 */
exports.create = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.sensormodel.create(req.body).then(
            sensormodel => broker.notification.log(req.client.id, ["sensormodel_create", sensormodel.to_read, sensormodel.id].join("+")).then(
                () => res.status(200).json({ id: sensormodel.id }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {get} /sensormodel 02) List
 * @apiGroup Sensormodel
 * @apiName listSensormodels
 * @apiDescription list all sensors. 
 * @apiVersion 1.0.0
 * @apiUse box
 *
 * @apiPermission admin
 * @apiSuccess {array} models list of sensors
 * @apiSuccess {string} transducer transducer name
 * @apiSuccess {string} measure transducer measure
 * @apiSuccess {decimal} min_acceptable minimum acceptable value to sensor
 * @apiSuccess {decimal} max_acceptable maximum acceptable value to sensor
 * @apiSuccess {decimal} min_possible minimum possible value to sensor
 * @apiSuccess {decimal} max_possible maximum possible value to sensor
 * @apiSuccess {decimal} min_graph minimum value to graph thresholds
 * @apiSuccess {decimal} max_graph maximum value to graph thresholds
 * @apiSuccess {string} to_read text to text-to-speech
 * @apiSuccessExample {json} Response example:
 * {
 *  "sensors": [
 *      {
 *          "transducer": "dht22",
 *          "measure":"temperature",
 *          "tag": "temp",
 *          "min_acceptable": "10",
 *          "max_acceptable": "25",
 *          "min_possible": "-20",
 *          "max_possible": "50",
 *          "min_graph": "5",
 *          "max_graph": "30",
 *      },
 *      {
 *          "transducer": "mq-7",
 *          "measure":"carbon_monoxide",
 *          "tag": "mono",
 *          "min_acceptable": "2",
 *          "max_acceptable": "10",
 *          "min_possible": "10",
 *          "max_possible": "500",
 *          "min_graph": "0",
 *          "max_graph": "13",
 *      }
 *  ]
 * }
 */
exports.list = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.sensormodel.list().then(
            sensormodels => res.status(200).json({ sensors: sensormodels }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {put} /sensormodel/:id 03) Update
 * @apiGroup Sensormodel
 * @apiName updateSensormodel
 * @apiDescription update a sensor.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id sensor id to update
 * @apiParam {string} transducer transducer name
 * @apiParam {decimal} min_acceptable minimum acceptable value to sensor
 * @apiParam {decimal} max_acceptable maximum acceptable value to sensor
 * @apiParam {decimal} min_possible minimum possible value to sensor
 * @apiParam {decimal} max_possible maximum possible value to sensor
 * @apiParam {decimal} min_graph minimum value to graph thresholds
 * @apiParam {decimal} max_graph maximum value to graph thresholds
 * @apiParamExample {json} Request example:
 *      {
 *           "transducer": "dht22",
 *           "min_acceptable": "10",
 *           "max_acceptable": "25",
 *           "min_possible": "-20",
 *           "max_possible": "50",
 *           "min_graph": "0",
 *           "max_graph": "13",
 *      }
 * @apiSuccess {boolean} result return "true" if was sucessfuly updated
 */
exports.update = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.sensormodel.update(req.params.id, req.body).then(
            sensormodel => broker.notification.log(req.client.id, ["sensormodel_update", sensormodel.to_read, sensormodel.id].join("+")).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

/**
 * @api {delete} /sensormodel/:id 04) Delete
 * @apiGroup Sensormodel
 * @apiName deleteSensormodel
 * @apiDescription remove a sensor
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id sensor ID to delete
 * @apiSuccess {boolean} result return "true" if was sucessfuly removed
 */
exports.delete = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.sensormodel.remove(req.params.id).then(
            sensormodel => broker.notification.log(req.client.id, ["sensormodel_delete", sensormodel.to_read].join("+")).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}