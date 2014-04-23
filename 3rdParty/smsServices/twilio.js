


module.exports = function () {
    return {send: function (msg, res, rej) {
        var accountSid = 'AC23130fc81511803edd4f9aaab15394d2',
            authToken = '7d57d244a6907c225dc9c75a66ed1afa',
         twilio = require('twilio'),
         client = new twilio.RestClient(accountSid, authToken);




        client.makeCall({

            to:msg.phone, // Any number Twilio can call
            from: '+97223724485', // A number you bought from Twilio and can use for outbound communication
            url: 'http://demo.twilio.com/docs/voice.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call

        }, function(err, responseData) {

            console.log(err);
            //executed when the call has been initiated.
            //console.log(responseData.from); // outputs "+14506667788"
res()
        });






        client.sms.messages.create({
            to: msg.phone,
            from: '+97223724485',
            body: msg.content
        }, function (error, message) {
            if (error) {
                console.log(error.message);
                rej(error);
            }
            else {
                res(message);
            }
        });
    }};
}