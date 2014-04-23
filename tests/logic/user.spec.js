var sinon = require('sinon'),
    when = require('when'),
    assert = require('assert'),
    should = require('should')
var $di = require('dependable').container();
$di.register(require('../../config'));

var daUser = {};

var User;

var user;

describe('User Logic', function () {


    var User;


    beforeEach(function () {
        user = {
            name: "chen roth",
            email: "rothchen@gmail.com"
        };
        daUser = {
            create: function (user, callback) {
                console.log("this is the fake da user");
                callback(undefined, true);
            },
            remove: function (user) {
                return when.promise(function (res, rej) {
                    res(user);
                });
            }
        };
        User = new $di.get('User', {daUser: daUser});

    });

    describe('.create', function () {


        it("should return promise", function () {
            User.create(user).should.be.an.instanceOf(when.Promise);
        })


        it('should create valid user', function (done) {
            User.create(user).then()
            {
                done();
            }
        });


        it('should NOT create invalid user', function (done) {
            user.email = "invalid-email";
            User = new $di.get('User', {
                daUser: {
                    create: function (user, callback) {
                        console.log("this is the fake da user");
                        callback(new Error(), false);
                    }
                }});

            User.create(user).
                done(function (res) {
                    assert.fail("create should've failed");
                    done();

                }, function (rej) {
                    done();
                });

        });
    })

    describe(".remove", function () {
        it("should return promise", function () {
            User.remove(user).should.be.an.instanceOf(when.Promise);
        })

        it("should success on valid email", function (done) {
            User.remove(user.email)

                .then(function () {
                    done();
                }).catch(function (err) {
                    console.log(err);
                })
            ;
        });
    })


});