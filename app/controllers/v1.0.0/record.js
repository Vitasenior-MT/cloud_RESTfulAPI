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
 * @apiParam {string} sensor_id sensor unique ID related to the value
 * @apiParamExample {json} Request example:
 * {
 *  "records":[
 *      {
 *          "value": 10,
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      },
 *      {
 *          "value": 13,
 *          "datetime": "2018-03-02T15:36:26.000Z",
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
        if (req.body.records) {
            business.record.create(req.body.records).then(
                result => {
                    if (result.has_invalid) res.status(200).json({ result: true, error: "some records were discarded by invalid parameters, value, datetime, sensor_id and board_id are required" });
                    else res.status(200).json({ result: true, error: "" });
                }, error => res.status(error.code).json(error.msg));
        } else { res.status(500).send("No records to introduce"); }
    } else { res.status(401).send("Unauthorized"); }
}

/**
 * @api {get} /record/sensor/:id/page/:page 2) List (Page)
 * @apiGroup Record
 * @apiName listFromPage
 * @apiDescription list all records from a sensor in a page
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id sensor unique ID
 * @apiParam {string} :page each page has 25 records, page must be greater or equal to 1
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {boolean} analyzed indicate if data was already analyzed
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": false 
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": true
 *      }
 *  ]
 * }
 */
exports.listFromPage = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.record.listFromPage(req.client, req.params.id, req.params.page).then(
            data => res.status(200).json({ records: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {get} /record/sensor/:id/start/:sdate/end/:edate 3) List (Dates)
 * @apiGroup Record
 * @apiName listBetweenDates
 * @apiDescription list all records from a sensor between dates
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id sensor unique ID
 * @apiParam {date} :start_date start date in UTC format
 * @apiParam {date} :end_date end date in UTC format
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {boolean} analyzed indicate if data was already analyzed
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": false 
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": true
 *      }
 *  ]
 * }
 */
exports.listBetweenDates = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.record.listBetweenDates(req.client, req.params.id, req.params.sdate, req.params.edate).then(
            data => res.status(200).json({ records: data }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}
