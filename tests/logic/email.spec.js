var sinon = require('sinon');
var assert = require('assert');
var should = require('should');

var Email = require('../../logic/email');

describe('Email', function() {

	var sandbox = sinon.sandbox.create();
	afterEach(function() { sandbox.restore() });

	it('should send to valid email', function() {

		var email = "1@1.com";
		var msg = "text";
		
		Email.send(email, msg).should.be.true;
	});

	it('should throw exception on invalid email', function() {
		
		var email = "invalid-email";
		var msg = "text";
		
		(function() { Email.send(email, msg) }).should.throwError("invalid email");
		
	});

	it('should throw exception on no content', function() {
		
		var email = "1@1.com";
		(function() { Email.send(email) }).should.throwError("no content"); 
		
	});

});