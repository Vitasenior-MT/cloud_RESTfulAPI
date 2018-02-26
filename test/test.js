var request = require("request"),
    assert = require('assert'),
    port = process.env.PORT || 8080;
var base_url = "http://localhost:" + port + "/";

describe("First test", function () {

    describe("GET /", function () {
        it("returns status code 200", function (done) {
            console.log("testing on: "+base_url);
            request.get(base_url, function (error, response, body) {

                assert.equal(200, response.statusCode);
                done();

            });
        });
    });

});