var sinon = require('sinon'),
    should = require('should'),
    when = require('when'),
    exceptions = require('../../domain/exceptions'),
    msg = {},
    provider = {send: function (msg, res, rej) {
        res();
    }},
    Email = require('../../logic/email')(provider);
describe("Email", function () {

    beforeEach(function () {
        msg.email = "1@1.com";
        msg.content = "text";
    });


    it("should send to valid email", function (done) {
        Email.send(msg).then(function () {
            done();
        })
    });


    it("should reject on invalid email", function (done) {
        msg.email = "invalid-email";
        Email
            .send(msg)
            .catch(exceptions.InvalidOperationError, function (err) {
                done();
            })
    });


    it("should throw exception on no content", function (done) {
        msg.content = null;
        Email
            .send(msg)
            .catch(exceptions.InvalidOperationError, function () {
                done();
            });
    });


    it("should return promise", function () {
        Email.send(msg).should.be.an.instanceOf(when.Promise);
    });

});