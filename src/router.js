// ROUTES FOR OUR API
// =============================================================================
module.exports = (app) => {

    var controllers = require('./controllers/index'),
        versioning = require('express-routes-versioning')();

    app
        /*________________________________________________
        *_____________________USERS_______________________
        *_________________________________________________*/
        .post('/api/register', versioning({
            "1.0.0": controllers.v1_0_0.user.register,
            "2.0.0": (req, res) => res.json({ error: 'invalid version' })
        }))
        .get('/api/validate/:token', versioning({
            "1.0.0": controllers.v1_0_0.user.validateEmail
        }))
        .post('/api/login', versioning({
            "1.0.0": controllers.v1_0_0.user.login,
        }))
        .get('/api/check', versioning({
            "1.0.0": controllers.v1_0_0.user.verifyToken
        }))
        .post('/api/chpass', versioning({
            "1.0.0": controllers.v1_0_0.user.changePassword,
        }))
        .post('/api/forgot', versioning({
            "1.0.0": controllers.v1_0_0.user.forgotPassword,
        }))
        .post('/api/reset', versioning({
            "1.0.0": controllers.v1_0_0.user.resetPassword,
        }))
        .post('/api/photo', versioning({
            "1.0.0": controllers.v1_0_0.user.setPhoto,
        }))
        .get('/api/user', versioning({
            "1.0.0": controllers.v1_0_0.user.list,
        }))
        .get('/api/user/:id/log', versioning({
            "1.0.0": controllers.v1_0_0.user.getLogs,
        }))
        .get('/api/doctor/patient', versioning({
            "1.0.0": controllers.v1_0_0.user.getPatients,
        }))
        .get('/api/doctor/request/list', versioning({
            "1.0.0": controllers.v1_0_0.user.getRequests,
        }))
        .get('/api/doctor/request/count', versioning({
            "1.0.0": controllers.v1_0_0.user.getRequestsCount,
        }))
        /*________________________________________________
        *____________________ VITABOX_____________________
        *_________________________________________________*/
        .post('/api/vitabox', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.create
        }))
        .get('/api/vitabox', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.list
        }))
        .get('/api/vitabox/:own', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.list
        }))
        .post('/api/vitabox/:id/register', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.register
        }))
        .post('/api/vitabox/:id/connect', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.requestToken
        }))
        .get('/api/vitabox/:id/settings', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getSettings
        }))
        .put('/api/vitabox/:id/settings', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.setSettings
        }))
        .put('/api/vitabox/:id/update', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.update
        }))
        .put('/api/vitabox/:id/reset', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.reset
        }))
        .delete('/api/vitabox/:id', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.delete
        }))
        .get('/api/vitabox/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getUsers
        }))
        .post('/api/vitabox/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.addUser
        }))
        .delete('/api/vitabox/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removeUser
        }))
        .post('/api/vitabox/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.addPatient
        }))
        .get('/api/vitabox/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getPatients
        }))
        .put('/api/vitabox/:id/patient/disable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.disablePatient
        }))
        .put('/api/vitabox/:id/patient/enable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.enablePatient
        }))
        .delete('/api/vitabox/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removePatient
        }))
        .post('/api/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.addBoard
        }))
        .get('/api/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getBoards
        }))
        .put('/api/vitabox/:id/board/disable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.disableBoard
        }))
        .put('/api/vitabox/:id/board/enable', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.enableBoard
        }))
        .delete('/api/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removeBoard
        }))
        .get('/api/inactive/vitabox', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.listInactive
        }))
        /*________________________________________________
        *__________________ BOARD MODEL___________________
        *_________________________________________________*/
        .post('/api/boardmodel', versioning({
            "1.0.0": controllers.v1_0_0.board_model.create
        }))
        .get('/api/boardmodel', versioning({
            "1.0.0": controllers.v1_0_0.board_model.list
        }))
        .put('/api/boardmodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.board_model.update
        }))
        .delete('/api/boardmodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.board_model.delete
        }))
        .post('/api/boardmodel/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board_model.setSensor
        }))
        .get('/api/boardmodel/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board_model.getSensors
        }))
        .delete('/api/boardmodel/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board_model.removeSensor
        }))
        /*________________________________________________
        *_____________________BOARD_______________________
        *_________________________________________________*/
        .post('/api/board', versioning({
            "1.0.0": controllers.v1_0_0.board.create
        }))
        .get('/api/board/:id', versioning({
            "1.0.0": controllers.v1_0_0.board.getById
        }))
        .post('/api/board/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.board.addPatientToBoard
        }))
        .delete('/api/board/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.board.removePatientFromBoard
        }))
        .get('/api/board/:id/sensor', versioning({
            "1.0.0": controllers.v1_0_0.board.getSensorsFromBoard
        }))
        .put('/api/board/:id/exchange', versioning({
            "1.0.0": controllers.v1_0_0.board.exchange
        }))
        .put('/api/board/:id/warnings', versioning({
            "1.0.0": controllers.v1_0_0.board.switchWarnings
        }))
        .get('/api/inactive/board', versioning({
            "1.0.0": controllers.v1_0_0.board.listInactive
        }))
        /*________________________________________________
        *____________________PATIENT______________________
        *_________________________________________________*/
        .put('/api/patient/:id/biometric', versioning({
            "1.0.0": controllers.v1_0_0.patient.updateBiometric
        }))
        .get('/api/patient/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.patient.getBoardsFromPatient
        }))
        .put('/api/patient/:id/profile', versioning({
            "1.0.0": controllers.v1_0_0.patient.updateProfile
        }))
        .post('/api/patient/:id/doctor', versioning({
            "1.0.0": controllers.v1_0_0.patient.addDoctor
        }))
        .put('/api/patient/:id/doctor', versioning({
            "1.0.0": controllers.v1_0_0.patient.acceptAsDoctor
        }))
        .delete('/api/patient/:id/doctor', versioning({
            "1.0.0": controllers.v1_0_0.patient.removeDoctor
        }))
        .post('/api/patient/:id/photo', versioning({
            "1.0.0": controllers.v1_0_0.patient.setPhoto
        }))
        .put('/api/patient/:id/exam', versioning({
            "1.0.0": controllers.v1_0_0.patient.updateSchedule
        }))
        .put('/api/patient/:id/info', versioning({
            "1.0.0": controllers.v1_0_0.patient.updateInfo
        }))
        .get('/api/patient/:id/info', versioning({
            "1.0.0": controllers.v1_0_0.patient.getPatientInfo
        }))
        /*________________________________________________
        *__________________SENSOR MODEL___________________
        *_________________________________________________*/
        .post('/api/sensormodel', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.create
        }))
        .get('/api/sensormodel', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.list
        }))
        .put('/api/sensormodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.update
        }))
        .delete('/api/sensormodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.sensor_model.delete
        }))
        /*________________________________________________
        *____________________RECORDS______________________
        *_________________________________________________*/
        .post('/api/record', versioning({
            "1.0.0": controllers.v1_0_0.record.create
        }))
        .get('/api/record/sensor/:id/page/:page', versioning({
            "1.0.0": controllers.v1_0_0.record.listFromPage
        }))
        .get('/api/record/sensor/:id/start/:sdate/end/:edate', versioning({
            "1.0.0": controllers.v1_0_0.record.listBetweenDates
        }))
        .get('/api/record/sensor/:sid/patient/:pid/page/:page', versioning({
            "1.0.0": controllers.v1_0_0.record.listFromPageByPatient
        }))
        .get('/api/record/sensor/:sid/patient/:pid/start/:sdate/end/:edate', versioning({
            "1.0.0": controllers.v1_0_0.record.listBetweenDatesByPatient
        }))
        .get('/api/record/analytic', versioning({
            "1.0.0": controllers.v1_0_0.record.listAnalyticFiles
        }))
        /*________________________________________________
        *_____________________FILES_______________________
        *_________________________________________________*/
        .get('/api/file/:id', versioning({
            "1.0.0": controllers.v1_0_0.manage.fileDownload
        }))
        .delete('/api/file/:id', versioning({
            "1.0.0": controllers.v1_0_0.manage.fileRemove
        }))
        /*________________________________________________
        *_________________PROFILE MODEL___________________
        *_________________________________________________*/
        .post('/api/profilemodel', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.create
        }))
        .get('/api/profilemodel', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.list
        }))
        .put('/api/profilemodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.update
        }))
        .delete('/api/profilemodel/:id', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.delete
        }))
        .post('/api/profilemodel/:id/measure', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.AddMeasure
        }))
        .delete('/api/profilemodel/:pid/measure/:mid', versioning({
            "1.0.0": controllers.v1_0_0.profile_model.removeMeasure
        }))
        /*________________________________________________
        *_____________________ERROR_______________________
        *_________________________________________________*/
        .get('/api/error/:page', versioning({
            "1.0.0": controllers.v1_0_0.error.list
        }))
        .put('/api/error/:id', versioning({
            "1.0.0": controllers.v1_0_0.error.check
        }))
        /*________________________________________________
        *____________________WARNING______________________
        *_________________________________________________*/
        .get('/api/warning/:page', versioning({
            "1.0.0": controllers.v1_0_0.warning.getWarnings
        }))
        .get('/api/warning', versioning({
            "1.0.0": controllers.v1_0_0.warning.getWarnings
        }))
        .get('/api/warning/:page/patient', versioning({
            "1.0.0": controllers.v1_0_0.warning.getPatientWarnings
        }))
        .get('/api/warning/:page/environment', versioning({
            "1.0.0": controllers.v1_0_0.warning.getEnvironmentWarnings
        }))
        .put('/api/warning', versioning({
            "1.0.0": controllers.v1_0_0.warning.checkWarnings
        }))
        /*________________________________________________
        *_________________NOTIFICATION____________________
        *_________________________________________________*/
        .get('/api/notification/:page', versioning({
            "1.0.0": controllers.v1_0_0.notification.getNotifications
        }))
        .get('/api/notification', versioning({
            "1.0.0": controllers.v1_0_0.notification.getNotifications
        }))
        .post('/api/notification', versioning({
            "1.0.0": controllers.v1_0_0.notification.postNotification
        }))
        .put('/api/notification', versioning({
            "1.0.0": controllers.v1_0_0.notification.checkNotifications
        }))
        /*________________________________________________
        *____________________SENSOR_______________________
        *_________________________________________________*/
        .get('/api/sensor/:id', versioning({
            "1.0.0": controllers.v1_0_0.sensor.find
        }))

    app.all('*', (req, res) => {
        res.status(404).json({ 'message': 'Route could not be found' });
    });
};