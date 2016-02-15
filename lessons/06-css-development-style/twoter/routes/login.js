var express = require('express');
var path = require('path');
var User = require(path.join(__dirname,'../models/userModel')).user;
var Twote = require(path.join(__dirname,'../models/userModel')).twote;


var router = express.Router();


var users = {};

// ErrorHandler method
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

users.show = function(req, res){
	res.render('login')
}

users.login = function(req, res){
	var name = req.body.name;
	console.log(req.body, "body");
	console.log(req.session, "session");
	if (!req.session.user) {
		req.session.user = name;
		User.find({name: name}, function(err, user){
			if(user.length ===0){
				var newUser = new User({name:name, twotes:[]})
				newUser.save(function(err, user){
					res.json(newUser)
				})
			} else {
			console.log(req.session.user, "SESSON USER")
			res.json({name:req.session.user});
			}
		}
	)}
};

	
users.logout = function(req, res){
	if(req.session.user){
		req.session.destroy(function(err){			
			res.send('done')
		});

	}
}


module.exports = users;