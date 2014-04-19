var sinon = require('sinon');
var assert = require('assert');
var should = require('should');

var User = require('../../logic/user');

describe('User', function() {

	var sandbox = sinon.sandbox.create();
	afterEach(function() { sandbox.restore() });

	it('should create valid user', function() {

		var user = {
			name: "chen roth",
			email: "rothchen@gmail.com"
		};

		User.create(user).should.be.true;
	});

	it('should NOT create invalid user', function() {

		var user = {
			name: "chen roth",
			email: "invalid-email"
		};

		User.create(user).should.be.false;

	});

	it('should delete user', function() {
		
		User.delete('1@1.com').should.be.true;
		
	});

});