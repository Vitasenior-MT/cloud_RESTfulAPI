var db = require('../../models/index');

exports.create = (patient_id, profile) => {
  return new Promise((resolve, reject) => {
    if (profile.tag && profile.min && profile.max && profile.measure && patient_id) {
      db.Profile.create({ tag: profile.tag, min: profile.min, max: profile.max, measure: profile.measure, patient_id: patient_id }).then(
        profile => resolve(profile),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "undefined fields, verify max and min values, measure and patient" });
  });
}

exports.update = (id, profile) => {
  return new Promise((resolve, reject) => {
    if (id && profile.tag && profile.min && profile.max && profile.measure) {
      db.Profile.findById(id).then(
        profile => profile.update({ tag: profile.tag, min: profile.min, max: profile.max, measure: profile.measure }).then(
          () => resolve(),
          error => reject({ code: 500, msg: error.message })),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "undefined fields, verify max and min values, measure, profile id and patient id" });
  });
}

exports.remove = (profile_id) => {
  return new Promise((resolve, reject) => {
    if (profile_id) {
      db.Profile.destroy({ where: { id: profile_id } }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "patient or profile undefined" });
  });
}