var business = require('../../business/index').v1_0_0,
    path = require("path");

// exports.fileUpload = (req, res) => {
//     if (req.client && req.client.constructor.name === "User" && req.client.admin) {
//         business.utils.upload('file').then(
//             upload => upload(req, res, (err) => {
//                 let path=req.file.path.split('/');
//                 if (err) res.status(500).send(err.message);
//                 else res.status(200).json({ filename: path[path.length-1] });
//             }),
//             error => res.status(error.code).send(error.msg));
//     } else {
//         res.status(401).send("Unauthorized");
//     }
// }

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
    business.utils.download(req.params.id).then(
        download => {
            res.writeHead(200, download.header);
            res.end(download.file, 'binary');
        }, error => res.status(error.code).send(error.msg));
}

// To development

exports.destroyAll = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.utils.deleteAll().then(
            () => res.status(200).json({ success: true }),
            error => res.status(500).send(error.msg)
        );
    } else {
        res.status(401).send(req.t("unauthorized"));
    }
}

var record_broker = require("../../workers/records");
exports.ampqSend = (req, res) => {
    let records = [
        {
            "value": 10,
            "datetime": "2018-03-02T15:40:23.000Z",
            "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
        },
        {
            "value": 13,
            "datetime": "2018-03-02T15:36:26.000Z",
            "sensor_id": "2a2f5839-6b68-41a6-ada7-f9cd4c66cf38"
        }
    ]
    record_broker.send(records).then(
        () => res.status(200).json({ success: true }),
        error => res.status(500).send(error.msg)
    );
}

exports.testDb = (req, res) => {
    business.utils.deleteAll().then(
        () => business.utils.testSeed().then(
            () => res.status(200).json({ success: true }),
            error => res.status(500).send(error.msg)),
        error => res.status(500).send(error.msg));
}