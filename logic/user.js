var when = require('when');

module.exports = function (daUser) {
    return {
        create: function (user) {
            return when.promise(function (res, rej) {
                daUser.create(user, function (err, result) {
                    if (err) {
                        rej(err);
                        return;
                    }
                    else {
                        res(result);
                    }
                });
            })
        },
        remove: function (user) {
            return when.promise(function (res, rej) {
                daUser.remove(user).then(res, rej);
            });
        }
    }
}
