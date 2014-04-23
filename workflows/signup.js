"use strict";
var util = require('util');
var exceptions = require('../domain/exceptions');
var when = require('when');


module.exports = function (User, Email, Sms, Logger) {

    var sendVerificationEmail = function (user) {
        var msg =
        {
            content: util.format("welcome %s! we hope you find what you're looking for in our store", user.firstName),
            email: user.email,
            name: user.firstName + ' ' + user.lastName
        };
        return Email.send(msg);
    };

    var sendVerificationSms = function (user) {
        var msg = {
            content: util.format("welcome %s! we hope you find what you're looking for in our store", user.firstName),
            phone: user.phone
        };
        return Sms.send(msg);
    };

    var saveUser = function (user) {
        return     User.create(user);// ? res(user) : rej("user is invalid, wasn't saved to db");
    };

    var sendAnyNotification = function (user) {
        console.log('start');
        return when.any([
            sendVerificationEmail(user), sendVerificationSms(user)
        ]).catch(function (err) {
            console.log('notifications failed');
            throw err[0]
        })
    };

    var rollback = function (err, user) {
        console.log('rollback');
        User.remove({email: user.email});
        throw err;
    }

    return function (user) {

        return when.try(saveUser, user)
            .then(sendAnyNotification)
            .catch(exceptions.InvalidOperationError, function (err) {
                console.log('throw');
                return rollback(err, user);
            });

    }
};