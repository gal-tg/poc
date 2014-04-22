var util = require('util');

module.exports = {
    send: function (to, content) {

        var phoneRegex = /^[0-9]{10,15}?/;

        if (!phoneRegex.test(to)) {
            throw new Error("invalid phone");
        }

        if (!content) {
            throw new Error("no content");
        }

        return true;
    }

};
