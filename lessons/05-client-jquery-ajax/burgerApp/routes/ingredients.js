// Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
// An Add button should allow the user to specify the name and price of a new ingredient which should appear on the page without requiring a refresh.
// Out-of-Stock button will tell the server to label the ingredient as disabled. The ingredient should be removed from the current page without refreshing. (Optional: make it toggleable to "add" more of the ingredient. In this case, do not remove the ingredient from the page, but make note through words or style that it is unavailable.)
// Edit button allows the user to submit a new name or price for the ingredient which the server will update. The edits should change the ingredient list without refreshing.

var express = require('express');
var path = require('path');
var Ingredient = require(path.join(__dirname,'../models/models'));
var Cat = require(path.join(__dirname,'../models/catModel'));
// mongoose.connect('mongodb://localhost/Ingredient');

var router = express.Router();
// var ingredientSchema = require('../models/models.js')

// var Ingredient = mongoose.model('Ingredient', ingredientSchema);

var ingredients = {};

// ErrorHandler method
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

ingredients.listAll = function(req, res){
	var listFull = [];
	Ingredient.find({}, function(err, ingredientsList){

		if (err) errorHandler(err,req,res);

		//console.log(ingredientsList.length)
		ingredientsList.forEach(function (ingredientItem){
		})
		// console.log("LOL", ingredientsObj)
		// for(var i = 0; i < ingredientsObj.length; i++){
		// 	listFull.push(ingredientsObj[i]);
		// };
	res.render('ingredients', {list: ingredientsList});
	});

	

	// var newIngred = new Ingredient({name: 'onion', price: 0.45, outOfStock: false});
	// newIngred.save();


};

//gotta use AJAX
//this function will add a new ingredient if it does not exist in the database
//and it will update the ingredient if it is already in the database
ingredients.addNewEdit = function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var outOfStock = req.body.outOfStock;
	console.log(name);
	Ingredient.find({name: name}, function(err, ingredient){
		if(ingredient.length !== 0){
			if(ingredient[0].name === name){  //assumes there is only ingredient
				Ingredient.update({name:name},{$set: {price: price, outOfStock:outOfStock}}, 
					function(err, record){
						Ingredient.find({name:name}, function(err, output){
							console.log(output[0], 'output')
							res.json(output[0])
						})
					}				
				)
			}
		} else{
			var newIngred = new Ingredient({name: name, price: price, outOfStock: outOfStock});
			newIngred.save(function (err, ingredient){
			res.json(ingredient)
			});
		}
	})

}

ingredients.removeOutOfStock = function(req, res){
	Ingredient.find({outOfStock: true}, function(err, ingredients){
		res.json(ingredients);
	})

}


module.exports = ingredients;
