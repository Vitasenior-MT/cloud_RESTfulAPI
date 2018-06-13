var db = require('../../models/index');

exports.create = (name, measures) => {
  return new Promise((resolve, reject) => {
    if (name) {
      db.Profilemodel.create({ name: name, measures: measures }).then(
        res => resolve(res.toJSON()),
        err => reject({ code: 500, msg: err.message }));
    } else reject({ code: 500, msg: "profile name or measures undentified" });
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.find({}).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res.map(p => { return p.toJSON() }));
    });
  });
}

exports.find = (id) => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.findOne({ '_id': id }).populate('measures').exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res.toJSON());
    });
  });
}

exports.update = (id, options) => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.findOneAndUpdate({ _id: id }, options).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  });
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.Profilemodel.deleteOne({ _id: id }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  });
}

exports.createMeasures = (measures) => {
  return new Promise((resolve, reject) => {
    db.Profilemeasure.insertMany(measures.filter(x => x.min && x.max && x.tag && x.measure)).then(
      res => resolve(res.map(x => { return x._id })),
      err => reject({ code: 500, msg: err.message }))
  });
}

exports.updateMeasure = (id, measure) => {
  return new Promise((resolve, reject) => {
    db.Profilemeasure.findOneAndUpdate(
      { _id: id },
      id ? Object.assign({ _id: measure.id }, measure) : measure,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      else resolve(res._id);
    });
  });
}

exports.removeMeasure = (id, options) => {
  return new Promise((resolve, reject) => {
    db.Profilemeasure.deleteOne({ _id: id }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      else resolve();
    });
  });
}