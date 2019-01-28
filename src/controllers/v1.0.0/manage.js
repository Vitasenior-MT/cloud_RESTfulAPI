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
    store.downloadFile(process.env.STORE_BUCKET, req.params.id)
        .then(img => {
            res.writeHead(200, { 'Content-Type': path.extname(req.params.id) });
            res.end(img, 'binary');
        }).catch(error => res.status(500).send(error.msg));
}