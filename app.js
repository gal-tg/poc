var $di = require('dependable').container();

$di.register(require('./config'));
var signup = new $di.get('signup'); 



signup({name:"chen roth", email:"1@1.com"}).done();


