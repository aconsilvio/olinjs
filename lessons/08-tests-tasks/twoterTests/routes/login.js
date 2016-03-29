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


//code from inital login (before passport)
// users.login = function(req, res){
// 	var name = req.body.name;
// 	console.log(req.body, "body");
// 	if (!req.session.user) {
// 		req.user.name = name;
// 		User.find({name: name}, function(err, user){
// 			if(user.length ===0){
// 				var newUser = new User({name:name, twotes:[]})
// 				newUser.save(function(err, user){
// 					res.json(newUser)
// 				})
// 			} else {
// 			console.log(req.user.name, "SESSON USER")
// 			res.json({name:req.user.name});
// 			}
// 		}
// 	)}
// };

	
users.logout = function(req, res){
	req.logout();
	res.redirect("/");
}


module.exports = users;