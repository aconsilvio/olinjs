var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    loggedIn: Boolean,
    twotes: [Object]});


var User = mongoose.model('users', userSchema);

module.exports = User;