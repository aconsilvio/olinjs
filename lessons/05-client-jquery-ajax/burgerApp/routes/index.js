//Filippos helped me here - what a guy
var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', {'link': [
		'/ingredients',
		'/order',
		'/kitchen',
		]
	})
});

module.exports = router;