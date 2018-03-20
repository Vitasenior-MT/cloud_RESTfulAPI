var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /board 08) Create Board
 * @apiGroup Board
 * @apiName create a new Board
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
exports.create = function (req, res) {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.board.create(req.body).then(
            result => res.status(200).json(result),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}