var $di = require('dependable').container();

$di.register(require('./config'));
var signup = new $di.get('signup');

var config = require('./domain/config');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();


app.listen(3000);
app.use(bodyParser());
app.use('/', router);

router.post('/user/', function (req, res) {

    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;

    var user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone
    };
    signup(user)
        .then(function (val) {
            res.json(val);
        })
        .catch(function (err) {
            res.json(err);
        })

});

router.get('/user/:email', function (req, res) {

    var email = req.params.email;
    $da.User.findByEmail(email, {__v: 0, _id: 0}).then(function (user) {

        res.json(user);

    });
});




