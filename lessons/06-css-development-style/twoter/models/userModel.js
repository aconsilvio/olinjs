var mongoose = require('mongoose');
var Schema = mongoose.Schema


var twoteSchema = mongoose.Schema({
	author: String,
    text: String,
    date: Date
    });


var userSchema = mongoose.Schema({
    name: String,
    twotes: [{type: Schema.ObjectId, ref:"Twote"}],
    password: String
});


var User = mongoose.model('User', userSchema);
var Twote = mongoose.model('Twote', twoteSchema);


module.exports.user = User;
module.exports.twote = Twote;