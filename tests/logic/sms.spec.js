'use strict';
var sinon = require('sinon'),
    when = require('when'),
    exceptions = require('../../domain/exceptions'),
    provider = {send: function (msg, res, rej) {
        res();
    }},
    Sms = require('../../logic/sms')(provider),
    msg={};
describe('Sms', function () {

    beforeEach(function () {
        msg.phone = "1234567890";
        msg.content = "text";
    })

    it('should send sms', function (done) {
        Sms
            .send(msg)
            .then(done);
    });


    it('should throw exception on invalid phone number', function (done) {
        msg.phone = "invalid phone";
        Sms
            .send(msg)
            .catch(exceptions.InvalidOperationError, function () {
                done();
            });
    });


    it('should throw exception on no content', function (done) {
        msg.content = null;
        Sms
            .send(msg)
            .catch(exceptions.InvalidOperationError, function (err) {
                done();
            });
    });

});