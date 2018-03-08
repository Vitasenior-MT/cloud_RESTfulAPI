var business = require('../../business/index').v1_0_0;

exports.destroyAll = function (req, res) {
    business.utils.deleteAll().then(
        () => res.status(200).json({ success: true }),
        error => res.status(500).send(error.message)
    );
}

exports.testDb = function (req, res) {
    business.utils.deleteAll().then(
        () => business.utils.testSeed().then(
            res.status(200).json({ success: true }),
            error => res.status(500).send(error.message)),
        error => res.status(500).send(error.message));
}