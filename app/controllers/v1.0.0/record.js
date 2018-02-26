var business = require('../../business/index').v1_0_0;

exports.create = function (req, res) {
    business.record.create(req.body).then(
        data => res.status(201).json({ result: true }),
        error => res.status(500).json({ result: false, error: error.message })
    );
}

exports.list = function (req, res) {
    business.record.list().then(
        data => res.status(201).json({ records: data }),
        error => res.status(500).json({ error: error.message })
    );
}