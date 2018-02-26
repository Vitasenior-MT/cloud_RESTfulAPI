var business = require('../../business/index').v1_0_0;

exports.destroyAll = function (req, res) {
    business.utils.deleteAll().then(
        () => res.status(201).json({ success: true }),
        error => res.status(500).json({ msg: error.message })
    );
}