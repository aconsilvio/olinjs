// Shows a list of all pending orders.
// A completed button beside each order that tells the server the order is complete. Clicking this should remove the order from the list of orders without refreshing the page.

var express = require('express');
var path = require('path');
var Order = require(path.join(__dirname,'../models/orderModel'));
var router = express.Router();


var kitchen = {};

// ErrorHandler method
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

kitchen.listAll = function(req, res){
	Order.find({}, function(err, orderList){

		if (err) errorHandler(err,req,res);

		res.render('kitchen', {list: orderList});
	});	
};

kitchen.remove = function(req, res){
	var selectedId = req.body.ingreds;
	console.log(req.body);

	Order.remove({_id: selectedId}, function(err, order){
		if (err) errorHandler(err,req,res);
		res.json({id:selectedId})
	});	
}


module.exports = kitchen;
