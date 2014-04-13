exports = function (promises, userBl, emailSender, smsSender, logger) {
    var addUser = function (user) {
        console.log('here');
        var result = userBl.addUser(user);
//        promises
//            .fcall(addUser(user))
//            .then(function(resolve){
//return                emailSender.send(resolve, msg);
//            })
//            .then(smsSender.send())
//            .error(logger.log(err))
//            .done(logger.log(msg));
    }
    return{
        addUser: addUser
    };
};