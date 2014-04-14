exports.createFake = function () {
    var User = require('../models/User');

    var user = new User({
        firstName: 'chen',
        lastName: 'roth',
        email: 'invalid-email'
    });
    return user;
}
