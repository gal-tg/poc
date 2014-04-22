'use strict';
var sinon = require('sinon');
var assert = require('assert');
var should = require('should');

var Sms = require('../../logic/sms');
var phone,msg;
describe('Sms', function () {

    var sandbox = sinon.sandbox.create();
    beforeEach(function () {
        phone = "1234567890";
         msg = "text";
    })

    afterEach(function () {
        sandbox.restore()
    });


    it('should send sms', function () {
        Sms.send(phone, msg)
    });


    it('should throw exception on invalid phone number', function () {
         phone = "invalid phone";
        (function () {
            Sms.send(phone, msg)
        }).should.throwError("invalid phone");
    });


    it('should throw exception on no content', function () {
        (function () {
            Sms.send(phone)
        }).should.throwError("no content");
    });

});