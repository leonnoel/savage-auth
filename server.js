// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient //talks to database
var mongoose = require('mongoose'); // how you really talk to your database
var passport = require('passport'); // for authentification
var flash    = require('connect-flash'); // for alert message

var morgan       = require('morgan'); //helps get you a log of what is going on
var cookieParser = require('cookie-parser'); // enables us to look at the logged in session
var bodyParser   = require('body-parser'); // enables us to look at stuff that comes along with a form submission
var session      = require('express-session');

var configDB = require('./config/database.js'); // grab your database. config DB is holding the object

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db); // spitting out a function. it is a function call
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')) //setting up public folder. no need to have individual css js etc


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2021b', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
