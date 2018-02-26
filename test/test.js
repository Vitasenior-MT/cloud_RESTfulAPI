var request = require("request"),
    assert = require('assert'),
    port = process.env.PORT || 8080;
var base_url = "http://localhost:" + port + "/";
var headers = {
    "Accept-Version": "1.0.0",
    "Content-Type": "application/json"
};

it("Testing connection", function (done) {
    request.get(base_url, function (error, response, body) {
        assert.equal(200, response.statusCode); done();
    });
});

it("Cleaning database", function (done) {
    request.get(base_url + "destroy", function (error, response, body) {
        assert.equal(200, response.statusCode); done();
    });
});

describe("Testing authentication", function () {

    describe("Email must be valid", function () {

        it("refuse email:'test1' password:'123QWEasd' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test1', password: '123QWEasd' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("refuse email:'test1@a.a' password:'123QWEasd' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test1@a.a', password: '123QWEasd' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("refuse email:'@ipt.pt' password:'123QWEasd' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: '@ipt.pt', password: '123QWEasd' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("accept email:'test1@ipt.pt' password:'123QWEasd' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test1@ipt.pt', password: '123QWEasd' }
            }, function (error, response, body) {
                assert.equal(200, response.statusCode); done();
            });
        });
        it("refuse repeated emails on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test1@ipt.pt', password: '123QWEasd' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("refuse email:'test2@ipt.pt' password:'' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test2@ipt.pt', password: '' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("refuse email:'test2@ipt.pt' password:'12345678' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test2@ipt.pt', password: '12345678' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("refuse email:'test2@ipt.pt' password:'1Qa' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test2@ipt.pt', password: '1Qa' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("refuse email:'test2@ipt.pt' password:'123QWE' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test2@ipt.pt', password: '123QWE' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("accept email:'test2@ipt.pt' password:'123qweASD' on /register", function (done) {
            request.post({
                headers: headers,
                url: base_url + "register",
                form: { email: 'test2@ipt.pt', password: '123qweASD' }
            }, function (error, response, body) {
                assert.equal(200, response.statusCode); done();
            });
        });
        it("refuse email:'test3@ipt.pt' password:'123qweASD' on /login", function (done) {
            request.post({
                headers: headers,
                url: base_url + "login",
                form: { email: 'test3@ipt.pt', password: '123qweASD' }
            }, function (error, response, body) {
                assert.equal(500, response.statusCode); done();
            });
        });
        it("accept email:'test2@ipt.pt' password:'123qweASD' on /login", function (done) {
            request.post({
                headers: headers,
                url: base_url + "login",
                form: { email: 'test2@ipt.pt', password: '123qweASD' }
            }, function (error, response, body) {
                assert.equal(200, response.statusCode);
                headers.Authorization = JSON.parse(body).token;
                done();
            });
        });
    });
});