var $di = require('dependable').container();

var should = require('should');
var sinon = require('sinon');

$di.register(require('../../config'));

var signup = new $di.get('signup'); 
var User = $di.get('User');
var Email = $di.get('Email');
var Logger = $di.get('Logger');

describe('Signup', function() {

	var user = {
		name: "chen roth",
		email: "rothchen@gmail.com"
	};

	var sandbox = sinon.sandbox.create();

	afterEach(function() { 

		sandbox.restore();

	});
	
	
	it('should create user', function(done) {

		sandbox.stub(User,'create').returns(true);
		sandbox.stub(Email,'send').returns(true);
		sandbox.stub(User,'delete');

		signup(user).done(function() {		

			sinon.assert.called(User.create);
			sinon.assert.called(Email.send);
			sinon.assert.notCalled(User.delete);

			done();

		});

	});	


	it('should fail create user', function(done) {

		sandbox.stub(User,'create').returns(false);
		sandbox.stub(Email,'send');
		sandbox.stub(User,'delete');

		signup(user).done(function() {		

			sinon.assert.called(User.create);
			sinon.assert.notCalled(Email.send);
			sinon.assert.called(User.delete);

			done();

		});

	});	


	it('should create user, but fail email verification', function(done) {

		sandbox.stub(User,'create').returns(true);
		sandbox.stub(Email,'send').throws(new Error("failed to send verification email"));
		sandbox.stub(User,'delete');

		signup(user).done(function() {		

			sinon.assert.called(User.create);
			sinon.assert.called(User.delete);
			sinon.assert.called(Email.send);

			done();

		});

	});	



});