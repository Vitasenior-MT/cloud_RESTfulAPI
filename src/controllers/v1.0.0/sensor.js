var business = require('../../business/index').v1_0_0;

/**
 * @api {get} /sensor/:id 01) Get
 * @apiGroup Sensor
 * @apiName findSensorById
 * @apiDescription find Sensor
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id sensor id
 * @apiSuccessExample {json} Response example:
 * {
    "sensor": {
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
          "max_possible": "60.00000",
          "min_graph": "20.00000",
          "max_graph": "60.00000"
      },
      "Board": {
        "id": "6b6899af-89bf-453b-a0ce-52523bb6aefd",
        "mac_addr": "45:44:54:65:65:16:51:31",
        "description": "José António"
        "Boardmodel": {
            "id": "c5e10ee8-9d80-43e0-af6c-29e95a0ca66e",
            "type": "non-wearable",
            "name": "MySignals Blood Pressure"
        }
      }
    }
  }
 */
exports.find = (req, res) => {
  if (req.client && req.client.constructor.name === "User") {
    business.sensor.find(req.params.id).then(
      sensor => business.vitabox.verifyUser(req.client, sensor.Board.Vitabox).then(
        () => {
          delete sensor.Board.Vitabox;
          res.status(200).json({ sensor: sensor })
        }, error => res.status(error.code).send(error.msg)),
      error => res.status(error.code).send(error.msg));
  } else { res.status(401).send("Unauthorized"); }
}