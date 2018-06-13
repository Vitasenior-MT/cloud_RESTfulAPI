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
 * @apiParam {array} measures profile measures, each measure needs a min and max thresholds, the measure name and the relative sensor model tag
 * @apiParamExample {json} Request example:
 *     {
 *          "name": "MySignals Balance",
 *          "measures": [
 *              {"measure": "body fat", "tag": "bodyfat", "min": 19, "max": 25},
 *              {"measure": "weight", "tag": "weight", "min": 58, "max": 64}
 *          ]
 *     }
 * @apiSuccess {string} id created profile model id
 */
exports.create = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.profilemodel.createMeasures(req.body.measures).then(
      measures => business.profilemodel.create(req.body.name, measures).then(
        model => res.status(200).json({ id: model.id }),
        error => res.status(error.code).send(error.msg)),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
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
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {get} /profilemodel/:id 03) Find
 * @apiGroup Profilemodel
 * @apiName findProfileModel
 * @apiDescription get details of a profile models.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission user
 * @apiParam {string} :id profile model id
 * @apiSuccess {string} name profile name
 * @apiSuccess {array} measures profile measures list
 * @apiSuccessExample {json} Response example:
 * {}
 */
exports.find = (req, res) => {
  if (req.client && req.client.constructor.name === "User") {
    business.profilemodel.find(req.params.id).then(
      model => res.status(200).json({ profile: model }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {put} /profilemodel/:id 04) Update
 * @apiGroup Profilemodel
 * @apiName listProfileModel
 * @apiDescription list all profile models.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id profile id
 * @apiParam {string} name profile name
 * @apiParam {array} measures profile measures list
 * @apiSuccess {boolean} result returns true if was successfuly updated
 */
exports.update = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    let promises = req.body.measures.map(x => { return business.profilemodel.updateMeasure(x.id, x); });
    Promise.all(promises).then(
      measures => business.profilemodel.update(req.params.id, { name: req.body.name, measures: measures.filter(x => x !== null) }).then(
        () => res.status(200).json({ result: true }),
        error => res.status(error.code).send(error.msg)),
      error => res.status(error.code).send("Cannot update measures"));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {delete} /profilemodel/:id 05) Remove
 * @apiGroup Profilemodel
 * @apiName removeProfileModel
 * @apiDescription remove a profile model.
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiParam {string} :id profile model id
 * @apiSuccess {boolean} result returns true if was successfuly removed
 */
exports.remove = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.profilemodel.remove(req.params.id).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}