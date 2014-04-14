describe('User CRUD', function () {
    var User = require('../models/User');
    var user = {};
    var should = require('should');


    beforeEach(function() {

        user = new User({
            firstName: 'chen',
            lastName: 'roth',
            email: 'rothchen@gmail.com'
        });

    });


    it("should add new user", function (done) {

        user.save(function (err, user, numAffected) {

            numAffected.should.be.exactly(1);//, 'user wasn\'t added to database');

            done();

        });
    });

    it("should reject invalid emails", function (done) {

        var User = require('../models/User');

        var user = new User({
            firstName: 'chen',
            lastName: 'roth',
            email: 'invalid-email'
        });

        user.validate(function (err) {
            err.should.be.type('object');

            //expect(err).toBeDefined('user passed validation');
            if (err && err.errors)
                //expect(err['errors']['email']).toBeDefined(user.email + ' passed email validation');
            err['errors']['email'].should.be.an.Object;
            done();
        });

    });

});