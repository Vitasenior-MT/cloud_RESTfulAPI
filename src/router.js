// ROUTES FOR OUR API
// =============================================================================
module.exports = (app) => {

    var controllers = require('./controllers/index'),
        versioning = require('express-routes-versioning')();

    app
        /*________________________________________________
        *_____________________USERS_______________________
        *_________________________________________________*/
        .post('/register', versioning({
            "1.0.0": controllers.v1_0_0.user.register,
            "2.0.0": (req, res) => res.json({ error: 'invalid version' })
        }))
        .post('/login', versioning({
            "1.0.0": controllers.v1_0_0.user.login,
        }))
        .post('/chpass', versioning({
            "1.0.0": controllers.v1_0_0.user.changePassword,
        }))
        .post('/forgot', versioning({
            "1.0.0": controllers.v1_0_0.user.forgotPassword,
        }))
        .post('/reset', versioning({
            "1.0.0": controllers.v1_0_0.user.resetPassword,
        }))
        .get('/photo', versioning({
            "1.0.0": controllers.v1_0_0.user.getPhoto,
        }))
        .post('/photo', versioning({
            "1.0.0": controllers.v1_0_0.user.setPhoto,
        }))
        .get('/doctor', versioning({
            "1.0.0": controllers.v1_0_0.user.getPatients,
        }))
        .get('/user', versioning({
            "1.0.0": controllers.v1_0_0.user.list,
        }))
        .get('/user/:id/log', versioning({
            "1.0.0": controllers.v1_0_0.user.getLogs,
        }))
        .get('/warning/:page', versioning({
            "1.0.0": controllers.v1_0_0.user.getWarnings
        }))
        .get('/warning', versioning({
            "1.0.0": controllers.v1_0_0.user.getWarnings
        }))
        .put('/warning', versioning({
            "1.0.0": controllers.v1_0_0.user.checkWarnings
        }))
        /*________________________________________________
        *____________________ VITABOX_____________________
        *_________________________________________________*/
        .post('/vitabox', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.create
        }))
        .get('/vitabox', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.list
        }))
        .get('/vitabox/:id', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.find
        }))
        .get('/vitabox/:id/settings', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getSettings
        }))
        .put('/vitabox/:id/settings', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.setSettings
        }))
        .put('/vitabox/:id', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.update
        }))
        .delete('/vitabox/:id', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.delete
        }))
        .post('/vitabox/:id/register', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.register
        }))
        .post('/vitabox/:id/connect', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.requestToken
        }))
        .get('/vitabox/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getUsers
        }))
        .post('/vitabox/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.addUser
        }))
        .delete('/vitabox/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removeUser
        }))
        .post('/vitabox/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.addPatient
        }))
        .get('/vitabox/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getPatients
        }))
        .put('/vitabox/:id/patient/disable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.disablePatient
        }))
        .put('/vitabox/:id/patient/enable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.enablePatient
        }))
        .delete('/vitabox/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removePatient
        }))
        .post('/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.addBoard
        }))
        .get('/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getBoards
        }))
        .put('/vitabox/:id/board/disable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.disableBoard
        }))
        .put('/vitabox/:id/board/enable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.enableBoard
        }))
        .delete('/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removeBoard
        }))
        /*________________________________________________
        *__________________ BOARD MODEL___________________
        *_________________________________________________*/
        .post('/boardmodel', versioning({
            "1.0.0": controllers.v1_0_0.board_model.create
        }))
        .get('/boardmodel', versioning({
            "1.0.0": controllers.v1_0_0.board_model.list
        }))
        .put('/boardmodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.board_model.update
        }))
        .delete('/boardmodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.board_model.delete
        }))
        .post('/boardmodel/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board_model.setSensor
        }))
        .get('/boardmodel/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board_model.getSensors
        }))
        .delete('/boardmodel/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board_model.removeSensor
        }))
        /*________________________________________________
        *_____________________BOARD_______________________
        *_________________________________________________*/
        .post('/board', versioning({
            "1.0.0": controllers.v1_0_0.board.create
        }))
        .get('/board/:id', versioning({
            "1.0.0": controllers.v1_0_0.board.getById
        }))
        .post('/board/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.board.addPatientToBoard
        }))
        .delete('/board/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.board.removePatientFromBoard
        }))
        .get('/board/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board.getSensorsFromBoard
        }))
        /*________________________________________________
        *____________________PATIENT______________________
        *_________________________________________________*/
        .get('/patient/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.patient.getBoardsFromPatient
        }))
        .put('/patient/:paid/profile/:prid', versioning({
            "1.0.0": controllers.v1_0_0.patient.updateProfile
        }))
        .post('/patient/:id/doctor', versioning({
            "1.0.0": controllers.v1_0_0.patient.addDoctor
        }))
        .get('/patient/:id/doctor', versioning({
            "1.0.0": controllers.v1_0_0.patient.getDoctor
        }))
        .delete('/patient/:id/doctor', versioning({
            "1.0.0": controllers.v1_0_0.patient.removeDoctor
        }))
        .get('/patient/:id/warning', versioning({
            "1.0.0": controllers.v1_0_0.patient.getWarningsByPatient
        }))
        /*________________________________________________
        *__________________SENSOR MODEL___________________
        *_________________________________________________*/
        .post('/sensormodel', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.create
        }))
        .get('/sensormodel', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.list
        }))
        .put('/sensormodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.update
        }))
        .delete('/sensormodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.delete
        }))
        /*________________________________________________
        *____________________RECORDS______________________
        *_________________________________________________*/
        .post('/record', versioning({
            "1.0.0": controllers.v1_0_0.record.create
        }))
        .get('/record/sensor/:id/page/:page', versioning({
            "1.0.0": controllers.v1_0_0.record.listFromPage
        }))
        .get('/record/sensor/:id/start/:sdate/end/:edate', versioning({
            "1.0.0": controllers.v1_0_0.record.listBetweenDates
        }))
        .get('/record/sensor/:sid/patient/:pid/page/:page', versioning({
            "1.0.0": controllers.v1_0_0.record.listFromPageByPatient
        }))
        .get('/record/sensor/:sid/patient/:pid/start/:sdate/end/:edate', versioning({
            "1.0.0": controllers.v1_0_0.record.listBetweenDatesByPatient
        }))
        /*________________________________________________
        *_____________________FILES_______________________
        *_________________________________________________*/
        .post('/file', versioning({
            "1.0.0": controllers.v1_0_0.manage.fileUpload
        }))
        .get('/file/:id', versioning({
            "1.0.0": controllers.v1_0_0.manage.fileDownload
        }))
        /*________________________________________________
        *_________________PROFILE MODEL___________________
        *_________________________________________________*/
        .post('/profilemodel', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.create
        }))
        .get('/profilemodel', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.list
        }))
        .put('/profilemodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.update
        }))
        .delete('/profilemodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.delete
        }))
        .post('/profilemodel/:id/measure', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.AddMeasure
        }))
        .delete('/profilemodel/:pid/measure/:mid', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.removeMeasure
        }))
        /*________________________________________________
        *_____________________ERROR_______________________
        *_________________________________________________*/
        .get('/error/all', versioning({
            "1.0.0": controllers.v1_0_0.error.listAll
        }))
        .get('/error/unseen', versioning({
            "1.0.0": controllers.v1_0_0.error.listUnseen
        }))
        .put('/error/:id', versioning({
            "1.0.0": controllers.v1_0_0.error.check
        }))
        /*________________________________________________
        *_____________________TRASH_______________________
        *_________________________________________________*/
        .get('/destroy', versioning({
            "1.0.0": controllers.v1_0_0.manage.destroyAll
        }))
        .get('/amqp', versioning({
            "1.0.0": controllers.v1_0_0.manage.ampqSend
        }))
        .get('/testdb', versioning({
            "1.0.0": controllers.v1_0_0.manage.testDb
        }))

    app.all('*', (req, res) => {
        res.status(404).json({ 'message': 'Route could not be found' });
    });
};