var business = require('../../business/index').v1_0_0;

/**
 * @api {get} /warning/:page 01) Get warning
 * @apiGroup Warning
 * @apiName getWarnings
 * @apiDescription get warnings from page
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :page warnings page
 * @apiSuccessExample {json} Response example:
 * {
    "warnings": [
        {
            "datetime": "2018-07-16T13:36:23.149Z",
            "message": "o valor de humidade do(a) Quarto está acima do recomendado",
            "sensor_id": "0e35251f-dd9c-4928-9b8d-a94a44f22770",
            "patient_id": null,
            "seen_vitabox": null
        }]
 * }
 */
/**
 * @api {get} /warning 02) Get warning to Vitabox
 * @apiGroup Warning
 * @apiName getWarningsAsVitabox
 * @apiDescription get all unseen warnings from vitabox
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox
 * @apiSuccessExample {json} Response example:
 * {
    "warnings": [
        {
            "datetime": "2018-07-16T13:36:23.149Z",
            "message": "o valor de humidade do(a) Quarto está acima do recomendado",
            "sensor_id": "0e35251f-dd9c-4928-9b8d-a94a44f22770",
            "patient_id": null,
            "seen_vitabox": null,
            "entity": "Av. Dr. Aurélio Ribeiro 3, Tomar, Portugal"
        },
        {
            "datetime": "2018-07-16T13:36:23.149Z",
            "message": "o valor de Pressão Arterial do(a) António está acima do recomendado",
            "sensor_id": "0e35251f-dd9c-4928-9b8d-a94a44f22770",
            "patient_id": "dd9c4928-9b8d-0e35-251f-22770a94a44f",
            "seen_vitabox": "2018-07-16T13:38:45.175Z",
            "entity": "Av. Dr. Aurélio Ribeiro 3, Tomar, Portugal"
        }
      ]
 * }
 */
exports.getWarnings = (req, res) => {
  if (req.client) {
    if (req.client.constructor.name === "Vitabox") business.warning.getFromVitabox(req.client.id).then(
      data => res.status(200).json({
        warnings: data.map(x => {
          return {
            "id": x._id,
            "datetime": x.datetime,
            "message": req.t(x.message, req.t(x.what), req.t(x.who)),
            "sensor_id": x.sensor_id,
            "patient_id": x.patient_id,
            "seen_vitabox": x.seen_vitabox,
            "entity": x.entity
          }
        })
      }), error => res.status(error.code).send(error.msg));
    else if (req.client.doctor) business.warning.getFromDoctor(req.params.page ? req.params.page : 1, req.client).then(
      data => res.status(200).json({
        warnings: data.map(x => {
          return {
            "id": x._id,
            "datetime": x.datetime,
            "message": req.t(x.message, req.t(x.what), req.t(x.who)),
            "sensor_id": x.sensor_id,
            "patient_id": x.patient_id,
            "seen_vitabox": x.seen_vitabox,
            "entity": null
          }
        })
      }), error => res.status(error.code).send(error.msg));
    else business.warning.getFromUser(req.params.page ? req.params.page : 1, req.client).then(
      data => {
        res.status(200).json({
          warnings: data.map(x => {
            return {
              "id": x._id,
              "datetime": x.datetime,
              "message": req.t(x.message, req.t(x.what), req.t(x.who)),
              "sensor_id": x.sensor_id,
              "patient_id": x.patient_id,
              "seen_vitabox": x.seen_vitabox,
              "entity": x.entity
            }
          })
        })
      }, error => res.status(error.code).send(error.msg));
  } else res.status(401).send(req.t("unauthorized"));
}

/**
* @api {put} /warning 03) Check warning
* @apiGroup Warning
* @apiName checkWarnings
* @apiDescription check all warnings, or a single warning by vitabox
* @apiVersion 1.0.0
* @apiUse box
* 
* @apiPermission vitabox, vitabox user, admin
* @apiParam {string} :warning_id (only to vitabox) warning unique ID
* @apiSuccess {boolean} result return true if was sucessfuly checked
*/
exports.checkWarnings = (req, res) => {
  if (req.client && req.client.constructor.name === "Vitabox") {
    if (req.body.warning_id) business.warning.checkWarningByVitabox(req.body.warning_id, req.client.id).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg));
    else res.status(500).send("warning id undifined");
  } else if (req.client) business.warning.checkWarningByUser(req.client).then(
    () => res.status(200).json({ result: true }),
    error => res.status(error.code).send(error.msg));
  else res.status(401).send(req.t("unauthorized"));
}