var $di = require('dependable').container();

var should = require('should');
var sinon = require('sinon');
var when = require('when');

$di.register(require('../../config'));

var User = $di.get('daUser');

describe('Data Access User', function () {

    var user = {
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com'
    };

    it("should create user", function (done) {

        User.create(user, function(err, user) {

            should(err).be.null;
            done();
        });

    });

    it("should find any single user", function(done) {

        User.findOne(undefined, undefined).then(function(user) {

            user.should.be.ok;
            done();

        });

    });

    it("should find users", function(done) {

        User.find().then(function(users) {

            users.should.be.instanceof(Array);
            done();

        });

    });

    it("should find user by email", function(done) {

        User.findByEmail(user.email, { _id: 0 , firstName: 1}).then(function(user) {

            user.firstName.should.eql('test');
            done();
        });

    });

    it("should update user email",function(done) {

        User.update({ email: user.email, firstName: user.firstName }, {firstName: 'zamboola'}).
        then(function(numAffected) {
            numAffected.should.eql(1);
            done();
        });

    });


    it("should remove one user", function(done) {

        User.remove({ firstName: 'zamboola' }).
        then(function(numDeleted) {
            numDeleted.should.be.above(0);
            done();

        });

    });


});