var exceptions = require('../domain/exceptions'),
    when = require('when');

module.exports = function (emailService) {
    return {
        send: function (msg) {
            return when.promise(function (res, rej) {

                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailRegex.test(msg.email)) {
                    rej(new exceptions.InvalidOperationError("invalid email"));
                }

                if (!msg.content) {
                    rej(new exceptions.InvalidOperationError("no content"));
                    return;
                }

                emailService.send(msg, res, rej);
            });
        }}
};
