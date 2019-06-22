var db = require('../../models/index');

exports.create = (name) => {
  return new Promise((resolve, reject) => {
    if (name) {
      db.Profilemodel.create({ name: name }).then(
        res => resolve(res.toJSON()),
        err => reject({ code: 500, msg: err.message }));
    } else reject({ code: 500, msg: "profile name or measures undentified" });
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.find({}).populate('measures').exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res.map(p => { return p.toJSON() }));
    });
  });
}

exports.update = (id, name) => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.findOneAndUpdate({ _id: id }, { name: name }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  });
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.findOne({ '_id': id }).populate('measures').exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      let promises = res.measures.map(x => new Promise((resolve, reject) => {
        db.Profilemeasure.deleteOne({ _id: x._id }).exec((err, res) => {
          if (err) reject({ code: 500, msg: err.message });
          else resolve();
        });
      }));
      Promise.all(promises).then(
        () => db.Profilemodel.deleteOne({ _id: id }).exec((err, res) => {
          if (err) reject({ code: 500, msg: err.message });
          resolve();
        }), error => reject({ code: 500, msg: error.message }));
    });
  });
}

exports.addMeasure = (profile_id, measure) => {
  return new Promise((resolve, reject) => {
    db.Profilemeasure.create({
      min_diurnal: measure.min_diurnal,
      max_diurnal: measure.max_diurnal,
      min_nightly: measure.min_nightly,
      max_nightly: measure.max_nightly,
      tag: measure.tag,
      measure: measure.measure
    }).then(
      res => db.Profilemodel.findOne({ '_id': profile_id }).populate('measures').exec((err, profile) => {
        if (err) reject({ code: 500, msg: err.message });
        if (!profile.measures.some(x => x.tag === measure.tag)) {
          profile.measures.push(res);
          profile.save().then(
            () => resolve(res._id),
            error => reject({ code: 500, msg: error.message }));
        } else reject({ code: 500, msg: "maesure already registered to profile" });
      }),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.removeMeasure = (profile_id, measure_id) => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.findOne({ '_id': profile_id }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      res.measures = res.measures.filter(x => x !== measure_id);
      res.save().then(
        () => db.Profilemeasure.deleteOne({ _id: measure_id }).exec((err, res) => {
          if (err) reject({ code: 500, msg: err.message });
          else resolve();
        }), error => reject({ code: 500, msg: error.message }));
    });
  });
}