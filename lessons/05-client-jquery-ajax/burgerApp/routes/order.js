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
}

order.listAll = function(req, res){
	var disabledList = [];
	Ingredient.find({}, function(err, ingredientsList){

		if (err) errorHandler(err,req,res);
			
		// ingredientsList.forEach(function (ingredientItem){});

		ingredientsList.forEach(function (ingredient){
			if(ingredient.outOfStock === true){
				ingredient['disabled'] = 'disabled';
			} else{
				ingredient['disabled'] = '';
			};
		});
		res.render('order', {list: ingredientsList});
	});	
};

order.orderBurger = function(req, res){
	var ingredientsList = [];
	var ingredients = req.body.ingreds;
	console.log(ingredients);
	Ingredient.find({outOfStock: false}, function(err, ingredientsList){
		for(var i = 0; i < ingredientsList.length; i++){
			if(ingredientsList[i].name === ingredients[0]){
				console.log('inside if')
			}
		}
		})
	};

// //gotta use AJAX
// //this function will add a new ingredient if it does not exist in the database
// //and it will update the ingredient if it is already in the database
// order.addNewEdit = function(req, res){
// 	var name = req.body.name;
// 	var price = req.body.price;
// 	var outOfStock = req.body.outOfStock;
// 	console.log(name);
// 	Ingredient.find({name: name}, function(err, ingredient){
// 		if(ingredient.length !== 0){
// 			if(ingredient[0].name === name){  //assumes there is only ingredient
// 				Ingredient.update({name:name},{$set: {price: price, outOfStock:outOfStock}}, 
// 					function(err, record){
// 						Ingredient.find({name:name}, function(err, output){
// 							console.log(output[0], 'output')
// 							res.json(output[0])
// 						})
// 					}				
// 				)
// 			}
// 		} else{
// 			var newIngred = new Ingredient({name: name, price: price, outOfStock: outOfStock});
// 			newIngred.save(function (err, ingredient){
// 			res.json(ingredient)
// 			});
// 		}
// 	})

// }

// order.removeOutOfStock = function(req, res){
// 	Ingredient.find({outOfStock: true}, function(err, ingredients){
// 		res.json(ingredients);
// 	})

// }


module.exports = order;
