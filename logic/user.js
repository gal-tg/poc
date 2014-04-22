var util = require('util');

module.exports = {
	
	util: util,
	create: function(user) {

		//console.log(util.format("* saving %s to db", user.email));
		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return (emailRegex.test(user.email));
	},

	delete: function(email) {

	//console.log(util.format("* %s has been deleted", email));	
	return true;
}


};

