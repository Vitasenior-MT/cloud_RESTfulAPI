var store = require('../../storage/index'),
    path = require("path");

/**
 * @api {get} /file/:id 01) Download
 * @apiGroup Files
 * @apiName fileDownload
 * @apiVersion 1.0.0
 * @apiError {number} statusCode http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} statusMessage error description
 * @apiParam {String} :id filename
 */
exports.fileDownload = (req, res) => {
    store.downloadFile(req.params.id.includes(".csv") ? process.env.STORE_ANALYTIC_BUCKET : process.env.STORE_BUCKET, req.params.id)
        .then(img => {
            res.writeHead(200, { 'Content-Type': path.extname(req.params.id) });
            res.end(img, 'binary');
        }).catch(error => res.status(500).send(error.msg));
}

/**
 * @api {delete} /file/:id 02) Remove
 * @apiGroup Files
 * @apiName fileRemove
 * @apiVersion 1.0.0
 * @apiError {number} statusCode http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} statusMessage error description
 * @apiParam {String} :id filename
 */
exports.fileRemove = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        store.deleteFile(process.env.STORE_ANALYTIC_BUCKET, req.params.id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(500).send(error.msg));
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}