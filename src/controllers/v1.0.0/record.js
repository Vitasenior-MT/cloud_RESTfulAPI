var business = require('../../business/index').v1_0_0,
    worker = require('../../workers/index');

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
 * @apiParam {string} patient_id (optional) patient unique ID related to the value
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
            worker.record.insert(req.body.records).then(
                () => res.status(200).json({ result: true }),
                error => res.status(error.code).json(error.msg));
        } else { res.status(500).send("No records to introduce"); }
    } else { res.status(401).send(req.t("unauthorized")); }
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
 * @apiSuccess {string} patient_id patient unique ID related to the value, may be null
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": false,
 *          "patient_id": null
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": true,
 *          "patient_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 */
exports.listFromPage = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.sensor.find(req.params.id).then(
            sensor => {
                if (sensor.Board.Vitabox) sensor.Board.Vitabox.hasUser(req.client).then(
                    success => {
                        if (success) business.record.listFromPage(req.params.id, req.params.page).then(
                            data => res.status(200).json({ records: data }),
                            error => res.status(error.code).send(error.msg));
                        else res.status(401).send(req.t("unauthorized"));
                    }, error => res.status(500).send(error.message));
                else res.status(500).send("This board doesn't belong to the vitabox");
            }, error => res.status(error.code).send(error.msg));
    } else res.status(401).send(req.t("unauthorized"));
}

/**
 * @api {get} /record/sensor/:sid/patient/:pid/page/:page 3) List to patient (Page)
 * @apiGroup Record
 * @apiName listFromPageByPatient
 * @apiDescription list all records from a sensor in a page related to a patient
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :sid sensor unique ID
 * @apiParam {string} :pid patient unique ID
 * @apiParam {string} :page each page has 25 records, page must be greater or equal to 1
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {boolean} analyzed indicate if data was already analyzed
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccess {string} patient_id patient unique ID related to the value, may be null
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": false,
 *          "patient_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": true,
 *          "patient_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 */
exports.listFromPageByPatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.sensor.find(req.params.sid).then(
            sensor => {
                if (sensor.Board.Vitabox) if (sensor.Board.Patients.filter(x => x.id === req.params.pid).length > 0) {
                    sensor.Board.Vitabox.hasUser(req.client).then(
                        success => {
                            if (success) business.record.listFromPageByPatient(req.params.sid, req.params.pid, req.params.page).then(
                                data => res.status(200).json({ records: data }),
                                error => res.status(error.code).send(error.msg));
                            else if (req.client.doctor) business.patient.verifyDoctor(req.client, req.params.pid).then(
                                () => business.record.listFromPageByPatient(req.params.sid, req.params.pid, req.params.page).then(
                                    data => res.status(200).json({ records: data }),
                                    error => res.status(error.code).send(error.msg)),
                                err => res.status(401).send(req.t("unauthorized")));
                            else res.status(401).send(req.t("unauthorized"));
                        }, error => res.status(500).send(error.message))
                } else res.status(500).send("This sensor doesn't belong to the patient");
                else res.status(500).send("This sensor doesn't belong to any vitabox");
            }, error => res.status(error.code).send(error.msg));
    } else res.status(401).send(req.t("unauthorized"));
}

/**
 * @api {get} /record/sensor/:id/start/:sdate/end/:edate 4) List (Dates)
 * @apiGroup Record
 * @apiName listBetweenDates
 * @apiDescription list all records from a sensor between dates
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id sensor unique ID
 * @apiParam {date} :sdate start date in UTC format
 * @apiParam {date} :edate end date in UTC format
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {boolean} analyzed indicate if data was already analyzed
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccess {string} patient_id patient unique ID related to the value, may be null
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": false,
 *          "patient_id": null
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": true,
 *          "patient_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 */
exports.listBetweenDates = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.sensor.find(req.params.id).then(
            sensor => {
                if (sensor.Board.Vitabox) sensor.Board.Vitabox.hasUser(req.client).then(
                    success => {
                        if (success) business.record.listBetweenDates(req.params.id, req.params.sdate, req.params.edate).then(
                            data => res.status(200).json({ records: data }),
                            error => res.status(error.code).send(error.msg));
                        else res.status(401).send(req.t("unauthorized"));
                    }, error => res.status(500).send(error.message));
                else res.status(500).send("This board doesn't belong to the vitabox");
            }, error => res.status(error.code).send(error.msg));
    } else res.status(401).send(req.t("unauthorized"));
}

/**
 * @api {get} /record/sensor/:sid/patient/:pid/start/:sdate/end/:edate 5) List to patient (Dates)
 * @apiGroup Record
 * @apiName listBetweenDatesByPatient
 * @apiDescription list all records from a sensor between dates related to a patient
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :sid sensor unique ID
 * @apiParam {string} :pid patient unique ID
 * @apiParam {date} :sdate start date in UTC format
 * @apiParam {date} :edate end date in UTC format
 * @apiSuccess {array} records records list
 * @apiSuccess {decimal} value value catched
 * @apiSuccess {datetime} datetime moment when the value was catched
 * @apiSuccess {boolean} analyzed indicate if data was already analyzed
 * @apiSuccess {string} sensor_id sensor unique ID related to the value
 * @apiSuccess {string} patient_id patient unique ID related to the value, may be null
 * @apiSuccessExample {json} Response example:
 * {
 *  "records": [
 *      {
 *          "datetime": "2018-03-02T15:40:23.000Z",
 *          "value": 10,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": false,
 *          "patient_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      },
 *      {
 *          "datetime": "2018-03-02T15:36:26.000Z",
 *          "value": 13,
 *          "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38",
 *          "analyzed": true,
 *          "patient_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
 *      }
 *  ]
 * }
 */
exports.listBetweenDatesByPatient = (req, res) => {
    if (req.client && req.client.constructor.name === "User") {
        business.sensor.find(req.params.sid).then(
            sensor => {
                if (sensor.Board.Vitabox) if (sensor.Board.Patients.filter(x => x.id === req.params.pid).length > 0) {
                    sensor.Board.Vitabox.hasUser(req.client).then(
                        success => {
                            if (success) business.record.listBetweenDatesByPatient(req.params.sid, req.params.pid, req.params.sdate, req.params.edate).then(
                                data => res.status(200).json({ records: data }),
                                error => res.status(error.code).send(error.msg));
                            else if (req.client.doctor) business.patient.verifyDoctor(req.client, req.params.pid).then(
                                () => business.record.listBetweenDatesByPatient(req.params.sid, req.params.pid, req.params.sdate, req.params.edate).then(
                                    data => res.status(200).json({ records: data }),
                                    error => res.status(error.code).send(error.msg)),
                                err => res.status(401).send(req.t("unauthorized")));
                            else res.status(401).send(req.t("unauthorized"));
                        }, error => res.status(500).send(error.message))
                } else res.status(500).send("This sensor doesn't belong to the patient");
                else res.status(500).send("This sensor doesn't belong to any vitabox");
            }, error => res.status(error.code).send(error.msg));
    } else res.status(401).send(req.t("unauthorized"));
}