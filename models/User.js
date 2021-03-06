var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

var userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    phone: { 
        type: Number,
        required: false
    },
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

