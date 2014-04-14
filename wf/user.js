module.exports = function (Promises, userBl, emailSender, smsSender, logger) {
    var addUser = function (user) {

        var flow = new Promises();
        p.then(function(){
            return userBl.addUser(user)
        }).then(function(){
            //return emailSender(user);
        }).then(function(){
            return log();
        });


//        promises
//            .fcall(addUser(user))
//            .then(function(resolve){
//return                emailSender.send(resolve, msg);
//            })
//            .then(smsSender.send())
//            .error(logger.log(err))
//            .done(logger.log(msg));
        //return result;
    }
    return{
        addUser: addUser
    };
};