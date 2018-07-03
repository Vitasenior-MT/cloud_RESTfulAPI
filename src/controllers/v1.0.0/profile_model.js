var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /profilemodel 01) Create
 * @apiGroup Profilemodel
 * @apiName createProfileModel
 * @apiDescription create a new profile model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} name profile model name
 * @apiParamExample {json} Request example:
 *     {
 *          "name": "MySignals Balance"
 *     }
 * @apiSuccess {string} id created profile model id
 */
exports.create = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.profilemodel.create(req.body.name).then(
      model => res.status(200).json({ id: model.id }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}

/**
 * @api {get} /profilemodel 02) List
 * @apiGroup Profilemodel
 * @apiName listProfileModel
 * @apiDescription list all profile models.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiSuccess {array} profiles list of profile models
 * @apiSuccess {string} id id of each profile model
 * @apiSuccess {string} name profile name
 * @apiSuccess {array} measures measures list of each profile
 * @apiSuccessExample {json} Response example:
 * {}
 */
exports.list = (req, res) => {
  if (req.client && req.client.constructor.name === "User") {
    business.profilemodel.list().then(
      models => res.status(200).json({ profiles: models }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}

/**
 * @api {put} /profilemodel/:id 03) Update name
 * @apiGroup Profilemodel
 * @apiName updateProfileModel
 * @apiDescription list all profile models.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id profile id
 * @apiParam {string} name profile name
 * @apiSuccess {boolean} result returns true if was successfuly updated
 */
exports.update = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.profilemodel.update(req.params.id, req.body.name).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}

/**
 * @api {delete} /profilemodel/:id 04) Remove
 * @apiGroup Profilemodel
 * @apiName deleteProfileModel
 * @apiDescription remove a profile model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id profile model id
 * @apiSuccess {boolean} result returns true if was successfuly removed
 */
exports.delete = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.profilemodel.remove(req.params.id).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}

/**
 * @api {post} /profilemodel/:id/measure 05) Add measure
 * @apiGroup Profilemodel
 * @apiName AddMaesureToProfileModel
 * @apiDescription add measure to profile model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id profile model id
 * @apiParam {string} tag measure tag
 * @apiParam {string} measure measure name
 * @apiParam {decimal} min minimum acceptable value
 * @apiParam {decimal} max maximum acceptable value
 * @apiParamExample {json} Request example:
 *     {
 *        "min": "10",
 *        "max": "50",
 *        "tag": "musclemass",
 *        "measure": "muscle mass"
 *     }
 * @apiSuccess {string} id created profile measure id
 */
exports.AddMeasure = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.profilemodel.addMeasure(req.params.id, req.body).then(
      model => res.status(200).json({ id: model }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}

/**
 * @api {delete} /profilemodel/:pid/measure/:mid 06) Remove measure
 * @apiGroup Profilemodel
 * @apiName removeMeasureFromProfileModel
 * @apiDescription remove meaure from a profile model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :pid profile model id
 * @apiParam {string} :mid measure model id
 * @apiSuccess {boolean} result returns true if was successfuly removed
 */
exports.removeMeasure = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.profilemodel.removeMeasure(req.params.pid, req.params.mid).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}