var when = require('when'),
    should = require('should'),
    util = require('util'),
    sinon = require('sinon'),
    exceptions = require('../../domain/exceptions');


var $di = require('dependable').container();
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
        stubs.userCreate = sandbox.stub(User, 'create').returns(when.promise(function (res, rej) {
            res(user);
        }));
        stubs.emailSend = sandbox.stub(Email, 'send').returns(when.promise(function (res, rej) {
            res(user);
        }));
        stubs.smsSend = sandbox.stub(Sms, 'send').returns(when.promise(function (res, rej) {
            res(user);
        }));
        stubs.userRemove = sandbox.stub(User, 'remove');
    });

    afterEach(function () {
        sandbox.restore();
    });


    it('should create user and persist it when everything works fine.', function (done) {
        signup(user).finally(function () {
            sinon.assert.called(User.create);
            sinon.assert.called(Email.send);
            sinon.assert.called(Sms.send);
            sinon.assert.notCalled(User.remove);
            done();
        });
    });


    it('should not send notification(email/sms) on db error', function (done) {
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


    it('should reject when all notificatino reject', function (done) {
        stubs.emailSend.returns(when.promise(function (res, rej) {
            rej(user);
        }));
        stubs.smsSend.returns(when.promise(function (res, rej) {
            rej(user);
        }));

        signup(user).catch(function () {
            done();
        });
    });


    it('should remove user when email and sms failed to sent', function (done) {
        stubs.emailSend.throws(new exceptions.InvalidOperationError("failed to send verification email"));
        stubs.smsSend.throws(new exceptions.InvalidOperationError("failed to send verification sms"));
        signup(user).finally(function () {
            sinon.assert.called(User.remove);
            done();
        });
    });


    it('should NOT remove user when only EMAIL threw exception', function (done) {
        stubs.emailSend.throws(new Error("failed to send verification email"));
        signup(user).finally(function () {
            sinon.assert.notCalled(User.remove);
            done();
        });
    });


    it('should NOT remove user when only SMS threw exception', function (done) {
        stubs.smsSend.throws(new Error("failed to send verification sms"));
        signup(user).finally(function () {
            sinon.assert.notCalled(User.remove);
            done();
        });
    });


    it('should send email to my@address.com', function (done) {
        user.email = "my@address.com";
        var msg =
        {
            content: util.format("welcome %s! we hope you find what you're looking for in our store", user.firstName),
            email: user.email,
            name: user.firstName + ' ' + user.lastName
        };
        signup(user).finally(function () {
            sinon.assert.calledWith(Email.send, msg)
            done();
        });
    });


    it('should send sms to 1239874561', function (done) {
        user.phone = "1239874561";
        var msg = {
            content: util.format("welcome %s! we hope you find what you're looking for in our store", user.firstName),
            phone: user.phone
        };
        signup(user).finally(function () {
            sinon.assert.calledWith(Sms.send, msg);
            done();
        });
    });

});