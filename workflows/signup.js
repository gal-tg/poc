"use strict";
var util = require('util');
var exceptions = require('../domain/exceptions');
var when = require('when');
var fn = require('when/function');


module.exports = function (User, Email, Sms, Logger) {

    var sendVerificationEmail = function (user) {
        return when.promise(function (res, rej) {
            var msg = util.format("welcome %s! we hope you find what you're looking for in our store", user.name);
            Email.send(user.email, msg) ? res(true) : rej(false);
        });
    };


    var sendVerificationSms = function (user) {
        return when.promise(function (res, rej) {
            var msg = util.format("welcome %s! we hope you find what you're looking for in our store", user.name);
            Sms.send(user.phone, msg) ? res(true) : rej(false);
        })
    };


    var saveUser = function (user) {
        return when.promise(function (res, rej) {

            User.create(user) ? res(user) : rej("user is invalid, wasn't saved to db");
        });
    };
    var sendAnyNotification = function (user) {
        return when.any([
            sendVerificationEmail(user), sendVerificationSms(user)
        ]).catch(function (err) {
            throw err[0]
        })
    };
    var rollback=function(err,user){
        User.delete(user.email);
    }
    return function (user) {

        return saveUser(user)
            .then(sendAnyNotification)
            .catch(exceptions.InvalidOperationError, function(err){
                return rollback(err,user);
            })
            .catch(exceptions.DatabaseError, function (err) {
                throw new Error();
            });
    }
};