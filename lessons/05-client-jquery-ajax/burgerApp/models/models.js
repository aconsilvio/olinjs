var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
    name: String,
    price: Number,
    outOfStock: Boolean});


var Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports = Ingredient;