var util = require('util');
var exceptions = require('../domain/exceptions');
var when = require('when');
module.exports = function (smsService) {
    return{
        send: function (msg) {
            return when.promise(function (res, rej) {
                var phoneRegex = /^[0-9]{10,15}?/;

                if (!phoneRegex.test(msg.phone)) {
                    rej(new exceptions.InvalidOperationError("invalid phone"));
                    return;
                }

                if (!msg.content) {
                    rej(new exceptions.InvalidOperationError("no content"));
                    return;
                }

                smsService.send(msg, res, rej);
            })
        }
    }
}