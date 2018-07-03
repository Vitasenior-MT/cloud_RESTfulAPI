var db = require('../../models/index');

exports.create = (profile) => {
  return new Promise((resolve, reject) => {
    if (profile.tag && profile.min && profile.max && profile.measure && profile.patient_id) {
      db.Profile.create({ tag: profile.tag, min: profile.min, max: profile.max, measure: profile.measure, patient_id: profile.patient_id }).then(
        profile => resolve(profile),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "undefined fields, verify max and min values, measure and patient" });
  });
}

exports.update = (profile_id, min, max) => {
  return new Promise((resolve, reject) => {
    if (profile_id && min && max) {
      db.Profile.findById(profile_id).then(
        profile => profile.update({ min: min, max: max }).then(
          () => resolve(),
          error => reject({ code: 500, msg: error.message })),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "undefined fields, verify max and min values and patient id" });
  });
}

exports.remove = (patient_id, tag) => {
  return new Promise((resolve, reject) => {
    if (patient_id && tag) {
      db.Profile.destroy({ where: { patient_id: patient_id, tag: tag } }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message }));
    } else reject({ code: 500, msg: "patient or profile undefined" });
  });
}