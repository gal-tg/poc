var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/test');

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

var userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
      //  validate: [function(val) { return emailRegex.test(val); }, 'Invalid email address'] },
    firstName: {
        type: String,
        required: true },
    lastName: {
        type: String,
        required: true },
    created: {
        type: Date,
        default: Date.now }

});

userSchema.path('email').validate(function (email) {
    return emailRegex.test(email);
}, 'Invalid email address');

module.exports = mongoose.model('User', userSchema);