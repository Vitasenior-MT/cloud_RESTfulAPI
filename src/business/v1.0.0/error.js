var db = require('../../models/index');

exports.getUnseen = () => {
  return new Promise((resolve, reject) => {
    db.Error.find().where({ seen_date: null }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res);
    });
  })
}

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.Error.find().exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res);
    });
  })
}

exports.setCheck = (error_id) => {
  return new Promise((resolve, reject) => {
    db.Error.find().where({ _id: error_id }).exec((err, error) => {
      if (err) reject({ code: 500, msg: err.message });
      if (error.seen_user !== null) {
        error.seen_user = user_id;
        error.seen_date = new Date();
        error.save().then(
          () => resolve(),
          err => reject({ code: 500, msg: err.message }));
      } else resolve();
    });
  })
}