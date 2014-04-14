"use strict";
var
    specBase = require('../../specBase'),
    userBl = specBase.createScheme('../bl/user'),
    userBlMock = specBase.createMock(userBl),
    emailSender = {},//specBase.createScheme(),
    smsSender = {},
    logger = {},
    promises = {},
    wf = require(process.cwd() + '/wf/user')(promises, userBl, emailSender, smsSender, logger);


exports.specBase = specBase;
exports.userBl = userBl;
exports.userBlMock = userBlMock;
exports.emailSender = emailSender;
exports.smsSender = smsSender;
exports.logger = logger;
exports.promises = promises;
exports.wf = wf;