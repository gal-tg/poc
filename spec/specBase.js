var sinon = require('sinon'),
    createScheme = function (modulePath) {
        var module = require(modulePath),
            schema = {};
        for (var p in module) {
            console.log('object: ' + p + '    -    is type of:' + typeof (module[p]));
            if (module[p].typeOf == 'function') {
                schema[p] = function () {
                    console.log(p + ' INVOKED');
                }
            } else {
                schema[p] = new Object();
            }
        }
    },
    createMock = function (scheme) {
        return sinon.mock(scheme);
    };
exports.fakes = {
    user: require('../fakes/userFakes')
};
exports.createScheme = createScheme;
exports.createMock = createMock;
exports.createMockAndScheme = function () {
    return createMock(createScheme());
}



