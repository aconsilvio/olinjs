// Shows a form which allows customers to create a new burger.
// There should be a checklist of all ingredients and their price.
// Out-of-stock ingredients should have a disabled checkbox (<input type="checkbox" disabled>)
// There should be a Submit button that will send the server the new order without refreshing the page.
// You may want to refer to the Mongo reading on Referencing vs. Embedding as you think about how you will store your data. You should give your customer a nice congratulatory message for completing their order (maybe a free cat picture since you're so good at that?!)
// A running counter of total cost: Should update whenever a new ingredient is added or removed.


var express = require('express');
var path = require('path');
var Ingredient = require(path.join(__dirname,'../models/models'));
var Order = require(path.join(__dirname,'../models/orderModel'));
var router = express.Router();


var order = {};

// ErrorHandler method
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
  // You can even chain these--
  // res.status(500).render('error', { error: err });
}

order.listAll = function(req, res){
	var disabledList = []; // is this ever used? If not, best to clean it up
	Ingredient.find({}, function(err, ingredientsList){

		if (err) errorHandler(err,req,res); // I love that you abstracted your error handler out! Very clean. I'm stealing this :)

		ingredientsList.forEach(function (ingredient){
			if(ingredient.outOfStock === true){
				// You should be able to use dot notation (ingredient.disabled) instead of bracket notation -- though it looks like `disabled` might be a JavaScript keyword
				ingredient['disabled'] = 'disabled'; // Seems redundant to me -- do 'disabled' and 'outOfStock' mean the same thing?
			} else{
				ingredient['disabled'] = '';
			};
		});
		res.render('order', {list: ingredientsList});
	});
};

order.orderBurger = function(req, res){
	var ingredients = req.body.ingreds;
	var ingredientsInBurger = [];
	var price = 0;
	Ingredient.find({outOfStock: false}, function(err, ingredientsList){
		// Why do you need to check that all ingredientsInBurger are in the ingredientsList?
		// (I think that's what this nested loop does).
		// Maybe better to prevent users from selecting ingredients which are out of stock on the client side?
		for(var i = 0; i<ingredients.length; i++){
			for(var j = 0; j < ingredientsList.length; j++){
				if(ingredients[i] === ingredientsList[j].name){
					ingredientsInBurger.push(ingredientsList[j])
					price = price + ingredientsList[j].price;
				}
			}
		}
		var newOrder = new Order({ingredients:ingredientsInBurger, price:price.toFixed(2)});
		newOrder.save(function(err, order){
			res.json(order);
		});
	});
};

module.exports = order;
