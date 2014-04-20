var util = require('util');

var when = require('when');
var fn = require('when/function');


module.exports = function(User, Email, Logger) {
	
	var sendVerificationEmail = function(user) {
		
		var msg = util.format("welcome %s! we hope you find what you're looking for in our store", user.name);		
		return Email.send(user.email, msg);

	};

	var saveUser = function(user) { 

		return when.promise(function(res, rej) {

			if (User.create(user))
				res(user);
			else
				rej("user is invalid, wasn't saved to db");				
		});	
	};

	return function(user) {

		return saveUser(user).
		then(fn.lift(sendVerificationEmail)).
		catch(function(err){ console.log(err); return when.try(User.delete, user.email); });
		
		
	};
};