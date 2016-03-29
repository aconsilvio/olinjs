var express = require('express');
var path = require('path');
var User = require(path.join(__dirname,'../models/userModel')).user;
var Twote = require(path.join(__dirname,'../models/userModel')).twote;


var router = express.Router();


var users = {};
var twotes = {};

// ErrorHandler method
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

twotes.listAll = function(req, res){
	console.log("USER", req.user)
	var user = req.user;

	Twote.find({}, function(err, twoteList){
		if (err) errorHandler(err,req,res);
		User.find({}, function(err, user){
			var flag;
			var logoutFlag;
			if(!req.user){
				flag = "none";
				logoutFlag = "block";
				name = "";
			} else{
				flag = "block";
				logoutFlag = "none";
				name = req.user.name;
			}
		res.render('index', {list: twoteList.reverse(), users:user, name:name, disFlag:flag, logoutFlag: logoutFlag});

		})
	})
}

twotes.newTwote = function(req, res){
	var text = req.body.text;
	var name = req.user.name;
	var author;
	var date = Date.now()
	var newTwote = new Twote({text:text, date:date, author:name});
	User.findOne({name:name}, function(err, user){
		user.twotes.push(newTwote)
		user.save(function(err, userSaved){
			newTwote.save(function(err, twote){
			res.json(twote)
		})
		})
	})
};

twotes.deleteTwote = function(req, res){
	var twoteID = req.body.id;
	Twote.remove({_id:twoteID}, function(err, twoteRm){
		console.log("REMOVED");
		res.json({id:twoteRm._id})
	})
}


module.exports = twotes;