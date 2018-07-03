var db = require('../../models/index');

exports.getByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.Log.find().where({ user_id: user_id }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res);
    });
  })
}