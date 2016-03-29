require('./../../../app'); // to connect to the database
var path = require('path');
var expect = require('chai').expect;
var User = require(path.join('./../../../models/userModel')).user;
var Twote = require(path.join('./../../../models/userModel')).twote;

describe('Twote Model', function() {
  it('should create a new twote', function(done) {
    var twote = new Twote({
      author: 'Annabel',
      text: 'Hi we are testing',
      date: 1455841289476
    });
    twote.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });


  it('should remove a twote with text "Hi we are testing "', function(done) {
    Twote.remove({ text: 'Hi we are testing' }, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

    it('should find all twotes in the db', function(done) {
    Twote.find({}, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
