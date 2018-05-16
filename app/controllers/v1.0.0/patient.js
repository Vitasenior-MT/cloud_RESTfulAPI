var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /board/:id/patient 01) Get Boards
 * @apiGroup Patient
 * @apiName getBoardsFromPatient
 * @apiDescription Get boards from a patient
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin sponsor
 * @apiParam {string} patient_id patient id to add
 * @apiParamExample {json} Request example:
 * {
 *  "boards": [
 *      {
 *          "id": "950c8b5e-6f43-4686-b21b-a435e96401b7",
 *          "description": "kitchen",
 *          "mac_addr": "00:12:4b:00:06:0d:60:c8",
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
 *                      "min_acceptable": "30.00000",
 *                      "max_acceptable": "50.00000",
 *                      "min_possible": "20.00000",
 *                      "max_possible": "60.00000"
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 * }
 */
exports.getBoardsFromPatient = (req, res) => {
  if (req.client && req.client.constructor.name === "User") {
      business.patient.getBoards(req.client, req.params.id).then(
          result => res.status(200).json({ boards: result }),
          error => res.status(error.code).send(error.msg));
  } else {
      res.status(401).send("Unauthorized");
  }
}