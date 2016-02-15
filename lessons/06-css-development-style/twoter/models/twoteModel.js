var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
	author: String,
    text: String,
    date: Date
    });


var Twote = mongoose.model('twotes', twoteSchema);

module.exports = Twote;