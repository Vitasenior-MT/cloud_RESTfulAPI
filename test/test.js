var request = require("request"),
    assert = require('assert'),
    port = process.env.PORT || 8080;
var base_url = "http://localhost:" + port + "/";
var test1_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var test2_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var admin_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var box_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var board1, board2, sensor1, sensor2, vitabox1, vitabox2, testuser1;

describe("Tests", () => {

    before((done) => {
        request.get(base_url, (error, response, body) => {
            assert.equal(200, response.statusCode);
            request.get(base_url + "testdb", (error, response, body) => {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

    it("login has admin", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "login",
            form: { email: 'admin@a.aa', password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            admin_headers.Authorization = JSON.parse(body).token;
            assert.equal(200, response.statusCode); done();
        });
    });


    /**
     * ______________________________________________________________________________________
     * ________________________________AUTHENTICATION________________________________________
     * ______________________________________________________________________________________
     */


    it("POST /register -> refuse email:'test1' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test1@a.a' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1@a.a', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'@ipt.pt' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: '@ipt.pt', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> accept email:'test1@ipt.pt' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1@ipt.pt', password: '123QWEasd' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            test1_headers.Authorization = JSON.parse(body).token;
            testuser1 = JSON.parse(body).user;
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /register -> refuse repeated emails", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1@ipt.pt', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });

    it("POST /register -> refuse email:'test2@ipt.pt' password:''", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test2@ipt.pt' password:'12345678'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '12345678' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test2@ipt.pt' password:'1Qa'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '1Qa' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test2@ipt.pt' password:'1234QWER'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '1234QWER' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> accept email:'test2@ipt.pt' password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });

    it("POST /login -> refuse email:'test3@ipt.pt' password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "login",
            form: { email: 'test3@ipt.pt', password: '123qweASD' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /login -> accept email:'test2@ipt.pt' password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "login",
            form: { email: 'test2@ipt.pt', password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            test2_headers.Authorization = JSON.parse(body).token;
            assert.equal(200, response.statusCode); done();
        });
    });

    it("POST /chpass -> refuse new_password:'456RTYfgh' old_password:'123qweZXC'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "chpass",
            form: { new_password: '456RTYfgh', old_password: '123qweZXC' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /chpass -> refuse new_password:'12345678' old_password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "chpass",
            form: { new_password: '12345678', old_password: '123qweASD' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /chpass -> accept new_password:'456RTYfgh' old_password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "chpass",
            form: { new_password: '456RTYfgh', old_password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });

    /**
     * ______________________________________________________________________________________
     * ____________________________________SENSORS___________________________________________
     * ______________________________________________________________________________________
     */


    it("POST /sensor -> must refuse user:test2@ipt.pt", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "sensor",
            form: { transducer: "dht22", measure: "temperature", min_acceptable: "10", max_acceptable: "25", min_possible: "-20", max_possible: "50" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /sensor -> must accept user:admin@a.aa and must receive the ID", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "sensor",
            form: { transducer: "dht22", measure: "temperature", min_acceptable: "10", max_acceptable: "25", min_possible: "-20", max_possible: "50" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            assert.equal(36, JSON.parse(body).id.length);
            sensor1 = JSON.parse(body).id;
            done();
        });
    });
    it("POST /sensor -> must refuse transducer:'mq-7' measure:'carbon_monoxide' min_acceptable:'' max_acceptable:'' min_possible:'' max_possible:''", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "sensor",
            form: { transducer: 'mq-7', measure: 'carbon_monoxide', min_acceptable: '', max_acceptable: '', min_possible: '', max_possible: '' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /sensor -> must refuse transducer:'' measure:'' min_acceptable:'2' max_acceptable:'10' min_possible:'10' max_possible:'500'", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "sensor",
            form: { transducer: '', measure: '', min_acceptable: '2', max_acceptable: '10', min_possible: '10', max_possible: '500' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /sensor -> must accept transducer:'mq-7' measure:'carbon_monoxide' min_acceptable:'2' max_acceptable:'10' min_possible:'10' max_possible:'500'", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "sensor",
            form: { transducer: 'mq-7', measure: 'carbon_monoxide', min_acceptable: '2', max_acceptable: '10', min_possible: '10', max_possible: '500' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            sensor2 = JSON.parse(body).id;
            done();
        });
    });
    it("GET /sensor -> must refuse user:test2@ipt.pt", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "sensor",
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /sensor -> must accept user:admin@a.aa and must receive an array", (done) => {
        request.get({
            headers: admin_headers,
            url: base_url + "sensor",
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            assert.equal(true, Array.isArray(JSON.parse(body).sensors));
            done();
        });
    });
    it("PUT /sensor/:id -> must refuse user:test2@ipt.pt", (done) => {
        request.put({
            headers: test2_headers,
            url: base_url + "sensor/" + sensor1,
            form: { transducer: "dht22", measure: "temperature", min_acceptable: "10", max_acceptable: "27", min_possible: "-15", max_possible: "50" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("PUT /sensor/:id -> must accept user:admin@a.aa", (done) => {
        request.put({
            headers: admin_headers,
            url: base_url + "sensor/" + sensor1,
            form: { transducer: "dht22", measure: "temperature", min_acceptable: "10", max_acceptable: "27", min_possible: "-15", max_possible: "50" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });
    it("DELETE /sensor/:id -> must refuse user:test2@ipt.pt", (done) => {
        request.delete({
            headers: test2_headers,
            url: base_url + "sensor/" + sensor1
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("DELETE /sensor/:id -> must accept user:admin@a.aa", (done) => {
        request.delete({
            headers: admin_headers,
            url: base_url + "sensor/" + sensor1
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /sensor -> Recreate the sensor to future tests", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "sensor",
            form: { transducer: "dht22", measure: "temperature", min_acceptable: "10", max_acceptable: "25", min_possible: "-20", max_possible: "50" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            sensor1 = JSON.parse(body).id;
            done();
        });
    });

    /**
     * ______________________________________________________________________________________
     * _____________________________________BOARDS___________________________________________
     * ______________________________________________________________________________________
     */


    it("POST /boardmodel -> must refuse user:test2@ipt.pt", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "boardmodel",
            form: { name: "Zolertia RE-Mote", type: "environmental" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /boardmodel -> must accept user:admin@a.aa and must receive the ID", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel",
            form: { name: "Zolertia RE-Mote", type: "environmental" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            board1 = JSON.parse(body).id;
            assert.equal(200, response.statusCode);
            assert.equal(36, JSON.parse(body).id.length); done();
        });
    });
    it("POST /boardmodel -> must refuse board type:'' name:'MySignals'", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel",
            form: { name: "Zolertia RE-Mote", type: "" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /boardmodel -> must refuse board type:'something' name:'MySignals'", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel",
            form: { name: "Zolertia RE-Mote", type: "something" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /boardmodel -> must accept type:'non-wearable' name:'MySignals'", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel",
            form: { "name": "MySignals", "type": "non-wearable" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            board2 = JSON.parse(body).id;
            assert.equal(200, response.statusCode); done();
        });
    });
    it("GET /boardmodel -> must refuse user:test2@ipt.pt", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "boardmodel"
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /boardmodel -> must accept user:admin@a.aa and must receive an array", (done) => {
        request.get({
            headers: admin_headers,
            url: base_url + "boardmodel"
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            assert.equal(true, Array.isArray(JSON.parse(body).models));
            done();
        });
    });
    it("PUT /boardmodel/:id -> must refuse user:test2@ipt.pt", (done) => {
        request.put({
            headers: test2_headers,
            url: base_url + "boardmodel/" + board2,
            form: { name: "MySignals v2.1", type: "non-wearable" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("PUT /boardmodel/:id -> must accept user:admin@a.aa", (done) => {
        request.put({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board2,
            form: { name: "MySignals v2.1", type: "non-wearable" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));

            assert.equal(200, response.statusCode); done();
        });
    });
    it("PUT /boardmodel/:id -> must refuse id:'12346789123467891234678912346789'", (done) => {
        request.put({
            headers: admin_headers,
            url: base_url + "boardmodel/12346789123467891234678912346789",
            form: { name: "MySignals v2.2", type: "non-wearable" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("PUT /boardmodel/:id -> must refuse type:''", (done) => {
        request.put({
            headers: admin_headers,
            url: base_url + "boardmodel/12346789123467891234678912346789",
            form: { name: "MySignals v2.2", type: "" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("PUT /boardmodel/:id -> must refuse type:'something'", (done) => {
        request.put({
            headers: admin_headers,
            url: base_url + "boardmodel/12346789123467891234678912346789",
            form: { name: "MySignals v2.2", type: "something" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("DELETE /boardmodel/:id -> must refuse user:test2@ipt.pt", (done) => {
        request.delete({
            headers: test2_headers,
            url: base_url + "boardmodel/" + board1
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("DELETE /boardmodel/:id -> must accept user:admin@a.aa", (done) => {
        request.delete({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board1
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /boardmodel/:id/sensor -> must refuse user:test2@ipt.pt", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor",
            form: { sensors: [sensor2] }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /boardmodel/:id/sensor -> must accept user:admin@a.aa", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor",
            form: { sensors: [sensor2] }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /boardmodel/:id/sensor -> must refuse id:'123456789123456789123456789123456789'", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel/123456789123456789123456789123456789/sensor",
            form: { sensors: [sensor2] }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /boardmodel/:id/sensor -> must refuse sensors:['123456789123456789123456789123456789']", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor",
            form: { sensors: ["123456789123456789123456789123456789"] }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /boardmodel/:id/sensor -> must refuse duplicate sensors", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor",
            form: { sensors: [sensor2] }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /boardmodel/:id/sensor -> accept id:'" + board2 + "' sensors:[" + sensor1 + "]", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor",
            form: { sensors: [sensor1] }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });
    it("GET /boardmodel/:id/sensor -> must refuse user:test2@ipt.pt", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor"
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /boardmodel/:id/sensor -> must accept user:admin@a.aa and must receive an array", (done) => {
        request.get({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor"
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            assert.equal(true, Array.isArray(JSON.parse(body).sensors));
            done();
        });
    });
    it("DELETE /boardmodel/:id/sensor -> must refuse user:test2@ipt.pt", (done) => {
        request.delete({
            headers: test2_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor",
            form: { sensor_id: sensor2 }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("DELETE /boardmodel/:id/sensor -> must accept user:admin@a.aa", (done) => {
        request.delete({
            headers: admin_headers,
            url: base_url + "boardmodel/" + board2 + "/sensor",
            form: { sensor_id: sensor2 }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });


    /**
     * ______________________________________________________________________________________
     * _____________________________________BOARDS___________________________________________
     * ______________________________________________________________________________________
     */

    it("POST /vitabox -> must refuse user:test2@ipt.pt", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "vitabox"
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox -> must accept user:admin@a.aa and must receive an id and password", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "vitabox"
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            vitabox1 = JSON.parse(body);
            assert.equal(200, response.statusCode);
            assert.equal(36, JSON.parse(body).id.length);
            assert.equal(10, JSON.parse(body).password.length); done();
        });
    });
    it("POST /vitabox -> create second vitabox to tests", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "vitabox"
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            vitabox2 = JSON.parse(body);
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/register -> must refuse user:test2@ipt.pt", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/register",
            form: { latitude: "38.8976763", longitude: "-77.0387185", address: "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA", email: "test2@ipt.pt" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/register -> must refuse non registered emails", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/register",
            form: { latitude: "38.8976763", longitude: "-77.0387185", address: "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA", email: "test5@ipt.pt" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/register -> must refuse address:''", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/register",
            form: { latitude: "38.8976763", longitude: "-77.0387185", address: "", email: "test5@ipt.pt" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/register -> must refuse -180>longitude>180 or -90>latitude>90", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/register",
            form: { latitude: "-96", longitude: "-190", address: "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA", email: "test5@ipt.pt" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/register -> must accept user:admin@a.aa", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/register",
            form: { latitude: "38.8976763", longitude: "-77.0387185", address: "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA", email: "test2@ipt.pt" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/connect -> must accept login by vitabox credentials", (done) => {
        request.post({
            headers: box_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/connect",
            form: { password: vitabox1.password }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            box_headers.Authorization = JSON.parse(body).token;
            done();
        });
    });
    it("POST /vitabox/:id/connect -> must refuse login by non registered vitabox", (done) => {
        request.post({
            headers: box_headers,
            url: base_url + "vitabox/" + vitabox2.id + "/connect",
            form: { password: vitabox2.password }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /vitabox -> any User may list their vitaboxes", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "vitabox"
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode);
            assert.equal(true, Array.isArray(JSON.parse(body).vitaboxes));
            done();
        });
    });
    it("GET /vitabox/:id -> must accept any User to search by vitabox if related to it", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(JSON.parse(body));
            assert.equal(200, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id -> must refuse access if user is not related to vitabox", (done) => {
        request.get({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id/settings -> must refuse access to settings if not a vitabox", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/settings"
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id/settings -> must refuse access to settings by a vitabox if not about itself", (done) => {
        request.get({
            headers: box_headers,
            url: base_url + "vitabox/" + vitabox2.id + "/settings"
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id/settings -> must accept access to vitabox settings about itself", (done) => {
        request.get({
            headers: box_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/settings"
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
    it("PUT /vitabox/:id -> must refuse a user that is not admin or sponsor to edit vitabox parameters", (done) => {
        request.put({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id,
            form: { "latitude": "38.8976763", "longitude": "-77.0387185", "address": "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("PUT /vitabox/:id -> must accept a sponsor to edit vitabox parameters", (done) => {
        request.put({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id,
            form: { latitude: "38.8976763", longitude: "-77.0387185", address: "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA" }
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
    it("PUT /vitabox/:id -> must refuse editing to address:''", (done) => {
        request.put({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id,
            form: { latitude: "38.8976763", longitude: "-77.0387185", address: "" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("PUT /vitabox/:id -> must refuse to editing to -180>longitude>180 or -90>latitude>90", (done) => {
        request.put({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id,
            form: { latitude: "-96", longitude: "-190", address: "1600 Pennsylvania Ave NW, Washington, DC 20500, EUA" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/user -> must refuse a user to add a another user or himself to vitabox", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "email": "test1@ipt.pt" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/user -> must refuse to add a non registered user", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "email": "user-example@some.thing" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/user -> must accept sponsor to add a existing user to vitabox", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "email": "test1@ipt.pt" }
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
    it("DELETE /vitabox/:id/user -> must refuse a non sponsor or admin to remove a user from vitabox", (done) => {
        request.delete({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "user_id": testuser1 }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("DELETE /vitabox/:id/user -> must accept sponsor or admin to remove a existing user from vitabox", (done) => {
        request.delete({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "user_id": testuser1 }
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id/user -> must refuse a user not related with vitabox to list the users", (done) => {
        request.get({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id/user -> must accept any user related with vitabox to list the users", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
        }, (error, response, body) => {
            assert.equal(200, response.statusCode);
            assert.equal(true, Array.isArray(JSON.parse(body).users)); done();
        });
    });
    it("POST /vitabox/:id/patient -> must refuse a user that is not sponsor or admin to add a patient to vitabox", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/patient",
            form: { "name": "José António", "birthdate": "1987-02-28", "gender": "male" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/user -> must refuse to add name:'' or birthdate:'' or gender:''", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "name": "", "birthdate": "", "gender": "" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /vitabox/:id/user -> must accept sponsor to add a existing user to vitabox", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "email": "test1@ipt.pt" }
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
    it("DELETE /vitabox/:id/user -> must refuse a non sponsor or admin to remove a user from vitabox", (done) => {
        request.delete({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "user_id": testuser1 }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("DELETE /vitabox/:id/user -> must accept sponsor or admin to remove a existing user from vitabox", (done) => {
        request.delete({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
            form: { "user_id": testuser1 }
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id/user -> must refuse a user not related with vitabox to list the users", (done) => {
        request.get({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("GET /vitabox/:id/user -> must accept any user related with vitabox to list the users", (done) => {
        request.get({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id + "/user",
        }, (error, response, body) => {
            assert.equal(200, response.statusCode);
            assert.equal(true, Array.isArray(JSON.parse(body).users)); done();
        });
    });

    it("DELETE /vitabox/:id -> must refuse a user that is not admin or sponsor to remove vitabox", (done) => {
        request.delete({
            headers: test1_headers,
            url: base_url + "vitabox/" + vitabox1.id
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("DELETE /vitabox/:id -> must accept a sponsor to remove vitabox", (done) => {
        request.delete({
            headers: test2_headers,
            url: base_url + "vitabox/" + vitabox1.id
        }, (error, response, body) => {
            assert.equal(200, response.statusCode); done();
        });
    });
});