var should = require('should'),
    helper = require('./wfTests/userTests/user.base.js');

describe("addUser", function () {
    it("should call: bl -> addUser", function () {
        //helper.userBlMock.expects('addUser').once();
        helper.wf.addUser({});
        //helper.userBlMock.verify();
    });
});
