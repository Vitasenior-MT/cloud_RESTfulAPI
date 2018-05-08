var business = require('../../business/index').v1_0_0;

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
            result => res.status(200).json(result),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {post} /board/:id/patient 02) Add Patient
 * @apiGroup Board
 * @apiName addPatientToBoard
 * @apiDescription Associate a patient with a board
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin sponsor
 * @apiParam {string} patient_id patient id to add
 * @apiParamExample {json} Request example:
 *     {
 *          "patient_id":"5d93585b-f511-4fa8-b69e-692c2474d5e8"
 *     }
 * @apiSuccess {booleam} result returns true if was successfuly added
 */
exports.addPatientToBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.board.addPatient(req.client, req.params.id, req.body.patient_id).then(
            result => res.status(200).json({ result: result }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {delete} /board/:id/patient 03) Remove Patient
 * @apiGroup Board
 * @apiName removePatientFromBoard
 * @apiDescription Disassociate a patient from a board
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin sponsor
 * @apiParam {string} patient_id patient id to add
 * @apiParamExample {json} Request example:
 *     {
 *          "patient_id":"5d93585b-f511-4fa8-b69e-692c2474d5e8"
 *     }
 * @apiSuccess {booleam} result returns true if was successfuly removed
 */
exports.removePatientFromBoard = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.board.removePatient(req.client, req.params.id, req.body.patient_id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}