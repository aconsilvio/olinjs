var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(function(err, res) {
        // Supertest lets us end tests this way...
        // (useful if we want to check a couple more things with chai)
        if (err) {
          return done(err);
        }
        done();
      });
  });


  it('should return 200 OK on GET /login', function(done) {
    request(app)
      .get('/login')
      .expect(200, done);
  });

  it('should return 302 OK on GET /auth/facebook/callback', function(done) {
    request(app)
      .get('/auth/facebook/callback')
      .expect(302, done);
  });

    it('should return 200 OK on POST /deleteTwote', function(done) {
    request(app)
      .post('/deleteTwote')
      .expect(200, done);
  });

    it('should return 302 OK on POST /loginLocal', function(done) {
    request(app)
      .post('/loginLocal')
      .expect(302, done);
  });


  it('should return 404 on GET /notaroute', function(done) {
    request(app)
      .get('/notaroute')
      .expect(404, done);
  });
});