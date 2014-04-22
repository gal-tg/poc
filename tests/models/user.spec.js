var $di = require('dependable').container();

var should = require('should');
var sinon = require('sinon');
var when = require('when');

$di.register(require('../../config'));

var db = $di.get('db');


describe('User model', function() {

	it("should reject invalid emails", function (done) {

		var user = new db.User({
			firstName: 'chen',
			lastName: 'roth',
			email: 'invalid-email'
		});

		user.validate(function (err) {

			should(err).be.ok;
			if (err && err.errors)
				should(err['errors']['email']).be.ok;
			done();
		});

	});
});

