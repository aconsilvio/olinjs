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
	var user = req.query.user;

	Twote.find({}, function(err, twoteList){
		if (err) errorHandler(err,req,res);
		User.find({}, function(err, user){
			var flag;
			var logoutFlag;
			if(!req.session.user){
				flag = "none"
				logoutFlag = "block"
			} else{
				flag = "block"
				logoutFlag = "none"
			}
		res.render('index', {list: twoteList.reverse(), users:user, name:req.session.user, disFlag:flag, logoutFlag: logoutFlag});

		})
	})
}

twotes.newTwote = function(req, res){
	var text = req.body.text;
	var name = req.session.user;
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