var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /boardmodel 01) Create Model
 * @apiGroup Board
 * @apiName createBoardModel
 * @apiDescription create a new board model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} name board model name
 * @apiParam {string} type board type, must be 'environmental', 'wearable' or 'non-wearable'
 * @apiParamExample {json} Request example:
 *     {
 *          "name": "Zolertia RE-Mote",
 *          "type": "environmental"
 *     }
 * @apiSuccess {string} id created board model id
 */
exports.create = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.boardmodel.create(req.body).then(
            model => res.status(200).json({ id: model.id }),
            error => res.status(500).json({ error: error.message }));
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
* @api {get} /boardmodel 02) List Models
* @apiGroup Board
* @apiName listsBoardsModel
* @apiDescription list all board models. 
* @apiVersion 1.0.0
* @apiUse box
*
* @apiPermission admin
* @apiSuccess {array} models list of board models
* @apiSuccess {string} id id of each board model
* @apiSuccess {string} type type of the model (must be 'environmental', 'wearable' or 'non-wearable')
* @apiSuccess {string} name name of the model
* @apiSuccessExample {json} Response example:
* {
*  "models": [
*      {
*          "id": "5d93585b-f511-4fa8-b69e-692c2474d5e8",
*          "type": "non-wearable",
*          "name": "MySignals"
*      },
*      {
*          "id": "d4710130-4c8c-4ade-96c7-0d5c00738eda",
*          "type": "environmental",
*          "name": "Zolertia RE-Mote"
*      }
*  ]
* }
*/
exports.list = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.boardmodel.list().then(
            models => res.status(200).json({ models: models }),
            error => res.status(500).json({ error: error.message }));
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {put} /boardmodel/:id 03) Update Model
 * @apiGroup Board
 * @apiName updateBoardModel
 * @apiDescription update a board model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id board model id to update
 * @apiParam {string} name board model name
 * @apiParam {string} type board type, must be 'environmental', 'wearable' or 'non-wearable'
 * @apiParamExample {json} Request example:
 *     {
 *          "name": "Zolertia RE-Mote",
 *          "type": "environmental"
 *     }
 * @apiSuccess {boolean} result return "true" if was sucessfuly updated
 */
exports.update = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.boardmodel.update(req.params.id, req.body).then(
            () => res.status(200).json({ result: true }),
            error => res.status(500).json({ error: error.message }));
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {delete} /boardmodel/:id 04) Delete Model
 * @apiGroup Board
 * @apiName deleteBoardModel
 * @apiDescription remove a board model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id board model id to delete
 * @apiSuccess {boolean} result return "true" if was sucessfuly removed
 */
exports.delete = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.boardmodel.remove(req.params.id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(500).json({ error: error.message }));
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {post} /boardmodel/:id/sensor 05) Add Sensor
 * @apiGroup Board
 * @apiName setSensors
 * @apiDescription add sensors to a board model
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {array} sensor_id sensors unique ID
 * @apiParamExample {json} Request example:
 * {
 *  "sensor_id": "75a60f5f-ef3d-4556-9cdd-981894c8f1dc"
 * }
 * @apiSuccess {boolean} result return true if was sucessfuly added
 */
exports.setSensor = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.boardmodel.setSensor(req.params.id, req.body.sensor_id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(500).json({ error: error.message }));
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {get} boardmodel/:id/sensor 06) Get Sensors
 * @apiGroup Board
 * @apiName getSensors
 * @apiDescription list sensors of a board model
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id board model unique ID
 * @apiSuccess {array} models list of sensors
 * @apiSuccess {string} transducer transducer name
 * @apiSuccess {string} measure transducer measure
 * @apiSuccess {decimal} min_acceptable minimum acceptable value to sensor
 * @apiSuccess {decimal} max_acceptable maximum acceptable value to sensor
 * @apiSuccess {decimal} min_possible minimum possible value to sensor
 * @apiSuccess {decimal} max_possible maximum possible value to sensor
 * @apiSuccessExample {json} Request example:
 * {
 *  "sensors": [
 *      {
 *           "id": "e783b552-567f-499b-b480-9d373fe62a17"
 *           "transducer": "dht22",
 *           "measure":"temperature",
 *           "min_acceptable": "10",
 *           "max_acceptable": "25",
 *           "min_possible": "-20",
 *           "max_possible": "50"
 *      }
 *  ]
 * }
 */
exports.getSensors = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.boardmodel.getSensors(req.params.id).then(
            sensors => res.status(200).json({ sensors: sensors }),
            error => res.status(500).json({ error: error.message }));
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}

/**
 * @api {delete} boardmodel/:id/sensor 07) Remove Sensor
 * @apiGroup Board
 * @apiName removeSensor
 * @apiDescription remove sensor from a board model 
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id board model unique ID
 * @apiParam {string} sensor_id sensor to remove ID
 * @apiParamExample {json} Response example:
 * {
 *  "sensor_id": "00397579-0a11-42ee-b522-b25e11630eda"
 * }
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.removeSensor = (req, res) => {
    if (req.client.constructor.name === "User" && req.client.admin) {
        business.boardmodel.removeSensor(req.params.id, req.body.sensor_id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(500).json({ error: error.message }));
    } else {
        res.status(500).json({ error: "Unauthorized" });
    }
}