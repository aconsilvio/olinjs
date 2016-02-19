require('./../../../app'); // to connect to the database
var path = require('path');
var expect = require('chai').expect;
var User = require(path.join('./../../../models/userModel')).user;
var Twote = require(path.join('./../../../models/userModel')).twote;

describe('User Model', function() {
  it('should create a new User', function(done) {
    var user = new User({
      name: 'Annabel',
      twotes:  [],
      password: '1234'
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });


  it('should create a new user if a user doesnt exist', function(done) {
  	var letters = ['a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'l', 'm']
  	var name = letters[Math.floor((Math.random() * letters.length) + 1)] + letters[Math.floor((Math.random() * letters.length) + 1)] + letters[Math.floor((Math.random() * letters.length) + 1)] + letters[Math.floor((Math.random() * letters.length) + 1)]+ letters[Math.floor((Math.random() * letters.length) + 1)]+ letters[Math.floor((Math.random() * letters.length) + 1)]+ letters[Math.floor((Math.random() * letters.length) + 1)]+ letters[Math.floor((Math.random() * letters.length) + 1)];
    User.findOne({ name: name }, function(err, user) {
    	if (!user){
    		var user = new User({
		      name: name,
		      twotes:  [],
		      password: '1234'
		    });
		    user.save(function(err) {
		      if (err) {
		        return done(err);
		      }
		      done();
   			});
    	}
      if (err) {
        return done(err);
      }
    });
  });

   it('should check if user exists', function(done) {
    User.findOne({ name: 'Bobo' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

      it('should return all twotes by one user', function(done) {
    User.findOne({ name: 'Annabel' }, function(err, user) {
      if (err) {
        return done(err);
      }
      user.twotes;
      done();
    });
  });

});
