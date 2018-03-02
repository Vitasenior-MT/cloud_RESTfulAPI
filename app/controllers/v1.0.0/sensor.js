var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /sensor 01) Create
 * @apiGroup Sensor
 * @apiName createSensor
 * @apiDescription create a new sensor.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} transducer transducer name
 * @apiParam {string} measure transducer measure
 * @apiParam {decimal} min_acceptable minimum acceptable value to sensor
 * @apiParam {decimal} max_acceptable maximum acceptable value to sensor
 * @apiParam {decimal} min_possible minimum possible value to sensor
 * @apiParam {decimal} max_possible maximum possible value to sensor
 * @apiParamExample {json} Request example:
 *      {
 *           "transducer": "dht22",
 *           "measure":"temperature",
 *           "min_acceptable": "10",
 *           "max_acceptable": "25",
 *           "min_possible": "-20",
 *           "max_possible": "50"
 *      }
 * @apiSuccess {string} id created sensor id
 */
exports.create = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.sensor.create(req.body).then(
            sensor => res.status(200).json({ id: sensor.id }),
            error => res.status(500).json({ error: error.message })
        );
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {get} /sensor 02) List
 * @apiGroup Sensor
 * @apiName listSensors
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
 * @apiSuccessExample {json} Response example:
 * {
 *  "sensors": [
 *      {
 *          "transducer": "dht22",
 *          "measure":"temperature",
 *          "min_acceptable": "10",
 *          "max_acceptable": "25",
 *          "min_possible": "-20",
 *          "max_possible": "50"
 *      },
 *      {
 *          "transducer": "mq-7",
 *          "measure":"carbon_monoxide",
 *          "min_acceptable": "2",
 *          "max_acceptable": "10",
 *          "min_possible": "10",
 *          "max_possible": "500"
 *      }
 *  ]
 * }
 */
exports.list = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.sensor.list().then(
            sensors => res.status(200).json({ sensors: sensors }),
            error => res.status(500).json({ error: error.message })
        );
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {put} /sensor/:id 03) Update
 * @apiGroup Sensor
 * @apiName updateSensor
 * @apiDescription update a sensor.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id sensor id to update
 * @apiParam {string} transducer transducer name
 * @apiParam {string} measure transducer measure
 * @apiParam {decimal} min_acceptable minimum acceptable value to sensor
 * @apiParam {decimal} max_acceptable maximum acceptable value to sensor
 * @apiParam {decimal} min_possible minimum possible value to sensor
 * @apiParam {decimal} max_possible maximum possible value to sensor
 * @apiParamExample {json} Request example:
 *      {
 *           "transducer": "dht22",
 *           "measure":"temperature",
 *           "min_acceptable": "10",
 *           "max_acceptable": "25",
 *           "min_possible": "-20",
 *           "max_possible": "50"
 *      }
 * @apiSuccess {boolean} result return "true" if was sucessfuly updated
 */
exports.update = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        console.log(req.client.admin);
        business.sensor.update(req.params.id, req.body).then(
            () => res.status(200).json({ result: true }),
            error => res.status(500).json({ error: error.message })
        );
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {delete} /sensor/:id 04) Delete
 * @apiGroup Sensor
 * @apiName deleteSensor
 * @apiDescription remove a sensor
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id sensor ID to delete
 * @apiSuccess {boolean} result return "true" if was sucessfuly removed
 */
exports.delete = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.sensor.remove(req.params.id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(500).json({ error: error.message })
        );
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}