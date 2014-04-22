var Base = require('./Base');

module.exports = function(db) {

    var User = new Base(db, 'User');

    User.findByEmail = function(email, project) {

        return this.findOne({email: email}, project);
    };

    return User;
}


