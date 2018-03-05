// ROUTES FOR OUR API
// =============================================================================
module.exports = (app) => {

    var controllers = require('./controllers/index'),
        versioning = require('express-routes-versioning')();


    app
        /*________________________________________________check
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
        /*________________________________________________check
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
            "1.0.0": controllers.v1_0_0.vitabox.settings
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
            "1.0.0": controllers.v1_0_0.vitabox.connect
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
        .delete('/vitabox/:id/patient', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removePatient
        }))
        .post('/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.addBoard
        }))
        .get('/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.getBoards
        }))
        .delete('/vitabox/:id/board', versioning({
            "1.0.0": controllers.v1_0_0.vitabox.removeBoard
        }))
        /*________________________________________________check
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
        /*________________________________________________check
        *_____________________SENSOR______________________
        *_________________________________________________*/
        .post('/sensor', versioning({
            "1.0.0": controllers.v1_0_0.sensor.create
        }))
        .get('/sensor', versioning({
            "1.0.0": controllers.v1_0_0.sensor.list
        }))
        .put('/sensor/:id', versioning({
            "1.0.0": controllers.v1_0_0.sensor.update
        }))
        .delete('/sensor/:id', versioning({
            "1.0.0": controllers.v1_0_0.sensor.delete
        }))
        /*________________________________________________
        *____________________RECORDS______________________
        *_________________________________________________*/
        .post('/record', versioning({
            "1.0.0": controllers.v1_0_0.record.create
        }))
        .get('/record/patient/:id', versioning({
            "1.0.0": controllers.v1_0_0.record.listByPatient
        }))
        .get('/record/board/:id', versioning({
            "1.0.0": controllers.v1_0_0.record.listByBoard
        }))
        .get('/record/sensor/:id', versioning({
            "1.0.0": controllers.v1_0_0.record.listBySensor
        }))
        /*________________________________________________
        *_____________________TRASH_______________________
        *_________________________________________________*/
        .get('/destroy', versioning({
            "1.0.0": controllers.v1_0_0.manage.destroyAll
        }))
        .get('/testdb', versioning({
            "1.0.0": controllers.v1_0_0.manage.testDb
        }))


    app.all('*', (req, res) => {
        res.status(404).json({ 'message': 'Route could not be found' });
    });
};