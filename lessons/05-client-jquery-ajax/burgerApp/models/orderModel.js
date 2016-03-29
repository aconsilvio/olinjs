var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    ingredients: Object,
    price: Number
});


var Order = mongoose.model('order', orderSchema);

module.exports = Order;