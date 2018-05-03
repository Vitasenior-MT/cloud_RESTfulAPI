var business = require('../../business/index').v1_0_0,
    fs = require("fs"),
    path = require("path");

exports.fileUpload = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.utils.upload('file').then(
            upload => upload(req, res, (err) => {
                if (err) res.status(500).send(err.message);
                else res.status(200).json({ result: true });
            }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

exports.fileDownload = (req, res) => {
    if (req.client && req.client.constructor.name === "User" && req.client.admin) {
        business.utils.download(req.params.id).then(
            download => {
                res.writeHead(200, download.header);
                res.end(download.file, 'binary');
            }, error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

// To development

exports.destroyAll = (req, res) => {
    business.utils.deleteAll().then(
        () => res.status(200).json({ success: true }),
        error => res.status(500).send(error.msg)
    );
}

exports.testDb = (req, res) => {
    business.utils.deleteAll().then(
        () => business.utils.testSeed().then(
            res.status(200).json({ success: true }),
            error => res.status(500).send(error.msg)),
        error => res.status(500).send(error.msg));
}