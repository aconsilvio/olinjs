var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');

var auth = require('./auth');

passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //This is not what you want to do here. 
    //Here you should search the connected DB if the user exists and load that in, or add it to db.
    done(null, profile);
  }
));



var app = express();

// view engine setup
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

app.get('/', index.listAll);
app.get('/login', login.show);

// app.get("/test", function(req, res) {
//   res.send("LOL test\n");
// });

// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/',
//                                       failureRedirect: '/login' })
// );

// app.get('/user', ensureAuthenticated, function(req, res) {
//   res.send(req.user);
// })

app.post('/newTwote', index.newTwote);
app.post('/deleteTwote', index.deleteTwote);
app.post('/login', login.login);
app.post('/logout', login.logout);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//     res.send(401);
// }

var mongoURI = "mongodb://localhost/test";
mongoose.connect(mongoURI);