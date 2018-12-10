var business = require('../../business/index').v1_0_0,
  broker = require("../../brokers/index");

/**
 * @api {get} /notification/:page 01) Get Notifications
 * @apiGroup Notification
 * @apiName getNotifications
 * @apiDescription get sent notifications by page
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiSuccessExample {json} Response example to user:
 * {
    "notifications": [
        {
            "vitabox_id": "4561ab4-9823-1fea-783d-a32764fab23",
            "vitabox": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA",
            "patient_id": "2561cdf-dd9c-4fea-783d-a327645236a",
            "patient": "Maria Albertina",
            "send_date": "2018-07-16T13:36:23.149Z",
            "check_date": "2018-07-16T13:36:25.102Z",
            "message": "Relembro que tem uma consulta dia 25 de Abril"
        }]
 * }
 * @apiSuccessExample {json} Response example to Vitabox:
 * {
    "notifications": [
        {
            "emitter_id": "0e35251f-dd9c-4928-9b8d-a94a44f22770",
            "emitter": "Joaquim Simões"
            "patient_id": "2561cdf-dd9c-4fea-783d-a327645236a",
            "patient": "Maria Albertina",
            "send_date": "2018-07-16T13:36:23.149Z",
            "check_date": "2018-07-16T13:36:25.102Z",
            "message": "Relembro que tem uma consulta dia 25 de Abril"
        }]
 * }
 */
exports.getNotifications = (req, res) => {
  if (req.client) {
    if (req.client.constructor.name === "User") {
      business.notification.getByUser(req.client.id, req.params.page ? req.params.page : 1).then(
        notifications => res.status(200).json({ notifications: notifications }),
        error => res.status(error.code).send(error.msg));
    } else {
      business.notification.getByVitabox(req.client.id, req.params.page ? req.params.page : 1).then(
        notifications => res.status(200).json({ notifications: notifications }),
        error => res.status(error.code).send(error.msg));
    }
  }
  else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {post} /notification 02) Send Notification
 * @apiGroup Notification
 * @apiName postNotification
 * @apiDescription sent notificationto patient or to vitabox
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} receiver patient id, if directed to a patient, or vitabox id, if directed to all patients at home
 * @apiParam {string} message profile name
 * @apiParam {boolean} to_patient flag indicating if the notification is to a patient or not
 * @apiSuccess {boolean} result returns true if was successfuly sent
 */
exports.postNotification = (req, res) => {
  if (req.client && req.client.constructor.name === "User") {
    if (req.body.to_patient) {
      business.patient.find(req.body.receiver).then(
        patient => business.vitabox.verifyUser(req.client, patient.Vitabox).then(
          () => business.notification.createToPatient(req.client, req.body, patient).then(
            () => broker.notification.message(patient.Vitabox.id, { "from": "Dr. " + business.utils.decrypt(req.client.name), "to": patient.name, "message": req.body.message }).then(
              () => res.status(200).json({ result: true }),
              error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg)),
          error => {
            if (error.code === 401 && req.client.doctor)
              business.patient.verifyDoctor(req.client, patient).then(
                () => business.notification.createToPatient(req.client, req.body, patient).then(
                  () => broker.notification.message(patient.Vitabox.id, { "from": "Dr. " + business.utils.decrypt(req.client.name), "to": patient.name, "message": req.body.message }).then(
                    () => res.status(200).json({ result: true }),
                    error => res.status(error.code).send(error.msg)),
                  error => res.status(error.code).send(error.msg)),
                error => res.status(error.code).send(error.msg));
            else res.status(error.code).send(error.msg);
          }),
        error => res.status(error.code).send(error.msg));
    } else {
      business.vitabox.find(req.body.receiver).then(
        vitabox => business.vitabox.verifyUser(req.client, vitabox).then(
          () => business.notification.createToVitabox(req.client, req.body, vitabox).then(
            () => broker.notification.message(req.body.receiver, { "from": business.utils.decrypt(req.client.name), "to": null, "message": req.body.message }).then(
              () => res.status(200).json({ result: true }),
              error => res.status(error.code).send(error.msg)),
            error => res.status(error.code).send(error.msg)),
          error => res.status(error.code).send(error.msg)),
        error => res.status(error.code).send(error.msg));
    }
  } else { res.status(401).send(req.t("unauthorized")); }
}

/**
 * @api {put} /notification 03) Check notifications
 * @apiGroup Notification
 * @apiName checkNotifications
 * @apiDescription check notifications as seen
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission vitabox
 * @apiSuccess {boolean} result returns true if was successfuly checked
 */
exports.checkNotifications = (req, res) => {
  if (req.client && req.client.constructor.name === "Vitabox") {
    business.notification.checkByVitabox(req.client.id).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg));
  }
  else { res.status(401).send(req.t("unauthorized")); }
}
