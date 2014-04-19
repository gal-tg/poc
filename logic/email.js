var util = require('util');
		
module.exports = {
	send: function(to, content) {
		
		var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		if (!emailRegex.test(to))
			throw new Error("invalid email");
		
		if (!content)
			throw new Error("no content");
		
		//console.log(util.format("* sending the following content to %s:", to));
		//console.log(util.format('"%s"', content));
		return true; 

	}

};
