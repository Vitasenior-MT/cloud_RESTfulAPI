var db = require('../../models/index'),
  utils = require('./utils');

exports.countUnseen = () => {
  return new Promise((resolve, reject) => {
    db.Error.countDocuments({ seen_date: null }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res);
    });
  })
}

exports.getFromPage = (page) => {
  return new Promise((resolve, reject) => {
    db.Error.find().sort('-datetime').skip((page - 1) * 25).limit(25).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });

      let promises = res.map(to_send => {
        if (to_send.seen_user !== null) return new Promise(resolve => {
          db.User.findOne({ where: { id: to_send.seen_user }, attributes: ["name"] }).then(
            user => {
              user.name = utils.decrypt(user.name);
              to_send.seen_user = user.name;
              resolve(to_send);
            },
            error => resolve(to_send));
        });
        else return to_send;
      });
      Promise.all(promises).then(
        res => resolve(res),
        err => reject({ code: 500, msg: err.message })
      );
    });
  })
}

exports.setCheck = (error_id, user_id) => {
  return new Promise((resolve, reject) => {
    db.Error.update({ _id: error_id, seen_user: null }, { seen_user: user_id, seen_date: new Date() }, (err) => {
      if (err) reject({ code: 500, msg: "error not found or already checked" });
      else resolve();
    })
  })
}