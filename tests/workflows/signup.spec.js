var $di = require('dependable').container();

var should = require('should');
var sinon = require('sinon');
var exceptions = require('../../domain/exceptions');

$di.register(require('../../config'));

var signup = new $di.get('signup');
var User = $di.get('User');
var Email = $di.get('Email');
var Sms = $di.get('Sms');
var Logger = $di.get('Logger');

describe('Signup workflow: ', function () {

    var user = {
        name: "chen roth",
        email: "rothchen@gmail.com"
    };

    var stubs = {};

    var sandbox = sinon.sandbox.create();
    beforeEach(function () {
        stubs.userCreate = sandbox.stub(User, 'create').returns(true);
        stubs.emailSend = sandbox.stub(Email, 'send').returns(true);
        stubs.smsSend = sandbox.stub(Sms, 'send').returns(true);
        stubs.userDelete = sandbox.stub(User, 'delete');
    });
    afterEach(function () {
        sandbox.restore();
    });


    it('should create user and not delete it when everything works fine.', function (done) {
        signup(user).finally(function () {
            sinon.assert.called(User.create);
            sinon.assert.called(Email.send);
            sinon.assert.called(Sms.send);
            sinon.assert.notCalled(User.delete);
            done();
        });
    });


    it('should not send notification(email/sms) when on db error', function (done) {
        stubs.userCreate.throws(new exceptions.DatabaseError('Could not add user to db'));
        signup(user).finally(function () {
            sinon.assert.notCalled(Email.send);
            sinon.assert.notCalled(Sms.send);
            done();
        });
    });
    it('should reject on db error', function (done) {
        stubs.userCreate.throws(new exceptions.DatabaseError('Could not add user to db'));
        signup(user).catch(function () {
            done();
        });
    });


    it('should delete user when email and sms failed to sent', function (done) {
        stubs.emailSend.throws(new exceptions.InvalidOperationError("failed to send verification email"));
        stubs.smsSend.throws(new exceptions.InvalidOperationError("failed to send verification sms"));
        signup(user).finally(function () {
            sinon.assert.called(User.delete);
            done();
        });
    });


    it('should NOT delete user when only EMAIL threw exception', function (done) {
        stubs.emailSend.throws(new Error("failed to send verification email"));
        signup(user).finally(function () {
            sinon.assert.notCalled(User.delete);
            done();
        });
    });


    it('should NOT delete user when only SMS threw exception', function (done) {
        stubs.smsSend.throws(new Error("failed to send verification sms"));
        signup(user).finally(function () {
            sinon.assert.notCalled(User.delete);
            done();
        });
    });


    it('should send email to my@address.com', function (done) {
        user.email = "my@address.com";
        signup(user).finally(function () {
            sinon.assert.calledWith(Email.send, 'my@address.com')
            done();
        });
    });

    it('should send email to my@address.com', function (done) {
        user.phone = "1239874561";
        signup(user).finally(function () {
            sinon.assert.calledWith(Sms.send, '1239874561');
            done();
        });
    });

});