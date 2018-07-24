var db = require('../../models/index'),
  utils = require('./utils');

exports.setHasDoctor = (user) => {
  return new Promise((resolve, reject) => {
    user.getPatients().then(
      patients => {
        if (patients.length > 0 && !user.doctor) user.update({ doctor: true }).then(
          () => resolve(),
          error => reject({ code: 500, msg: error.message }));
        else if (patients.length === 0 && user.doctor) user.update({ doctor: false }).then(
          () => resolve(),
          error => reject({ code: 500, msg: error.message }));
        else resolve();
      }, error => reject({ code: 500, msg: error.message }));
  });
}

exports.listDoctorRequests = (doctor_id) => {
  return new Promise((resolve, reject) => {
    db.DoctorPatient.find({ where: { user_id: doctor_id, accepted: false } }).then(
      requests => {
        let promises = requests.map(request =>
          new Promise((resolve, reject) => db.Patient.findById(request.patient_id).then(
            patient => resolve({
              created_at: request.created_at,
              patient_id: patient.id,
              patient: utils.decrypt(patient.name)
            }),
            error => reject(error))));
        Promise.all(promises).then(
          requests => resolve(requests),
          error => reject({ code: 500, msg: error.message }));
      }, error => reject({ code: 500, msg: error.message }));
  })
}

exports.acceptAsDoctor = (doctor_id, patient_id, flag) => {
  return new Promise((resolve, reject) => {
    db.DoctorPatient.findOne({ where: { user_id: doctor_id, patient_id: patient_id } }).then(
      relation => {
        if (relation) relation.update({ accepted: flag }).then(
          () => resolve(),
          error => reject({ code: 500, msg: error.message }));
        else reject({ code: 500, msg: "request not found" });
      }, error => reject({ code: 500, msg: error.message }));
  })
}

exports.getPatients = (user) => {
  return new Promise((resolve, reject) => {
    user.getPatients({
      through: { accepted: true },
      attributes: ['id', 'birthdate', 'name', 'gender', ['created_at', 'since'], 'active', 'weight', 'height'],
      include: [
        {
          model: db.Board, attributes: ['id', 'mac_addr'],
          include: [
            { model: db.Boardmodel, attributes: ['id', 'type', 'name', 'tag'] },
            {
              model: db.Sensor, attributes: ['id', 'last_values', 'last_commit'],
              include: [{ model: db.Sensormodel, attributes: { exclude: ['created_at', 'updated_at'] } }]
            }]
        },
        { model: db.Profile },
        { model: db.Vitabox, attributes: ['id', 'latitude', 'longitude', 'address'] }
      ]
    }).then(
      patients => {
        patients.forEach(patient => {
          patient.name = utils.decrypt(patient.name);
          patient.Vitabox.address == utils.decrypt(patient.Vitabox.address);
          patient.Boards.forEach(board => delete board.dataValues.PatientBoard);
        });
        resolve(patients);
      },
      error => reject({ code: 500, msg: error.message }));
  });
}
