describe("user wf", function () {

    var promises,
        userBl = {addUser: function () {
        }},
        emailSender,
        smsSender,
        logger,
        fw = require('../../../wf/user')(promises, userBl, emailSender, smsSender, logger);

    require('./user.addUser.tests').run(fw);
});   