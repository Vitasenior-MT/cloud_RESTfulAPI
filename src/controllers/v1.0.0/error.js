var business = require('../../business/index').v1_0_0;

/**
 * @api {get} /error/:page 01) List
 * @apiGroup Error
 * @apiName listAllErrors
 * @apiDescription get all errors
 * @apiVersion 1.0.0
 * @apiUse box
 * 
 * @apiPermission admin
 * @apiSuccessExample {json} Response example:
 * {
 *  "errors":[
 *    {
 *      "id": "0e35251fdd9c4928-9b8d",
 *      "title": "Os valores do sensor estão fora dos limites possíveis",
 *      "datetime": "2018-02-19T14:55:59.000Z",
 *      "message": "",
 *      "seen_date": "2018-02-19T15:13:23.000Z",
 *      "seen_user":"Administrator Name"
 *    },
 *    {
 *      "id": "0e35251fdd9c4928-9b8d",
 *      "title": "Os valores do sensor estão fora dos limites possíveis",
 *      "datetime": "2018-02-19T14:55:59.000Z",
 *      "message": "",
 *      "seen_date": null,
 *      "seen_user": null
 *    }
 *  ]
 * }
 */
exports.list = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.error.getFromPage(req.params.page).then(
      data => {
        data.forEach(x => {
          x.toJSON();
          x.title = req.t(x.title);
        });
        res.status(200).json({ errors: data });
      },
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}

/**
* @api {put} /error/:id 02) Check
* @apiGroup Error
* @apiName checkError
* @apiDescription get all warnings from vitabox
* @apiVersion 1.0.0
* @apiUse box
* 
* @apiPermission admin
* @apiParam {string} :id error unique ID
* @apiSuccess {boolean} result return true if was sucessfuly updated
*/
exports.check = (req, res) => {
  if (req.client && req.client.constructor.name === "User" && req.client.admin) {
    business.error.setCheck(req.params.id, req.client.id).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send(req.t("unauthorized"));
  }
}