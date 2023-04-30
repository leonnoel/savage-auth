// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080; //where the port is 
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose'); //another way of talking to mongo =db 
var passport = require('passport'); //
var flash    = require('connect-flash');
//everything in parentheses is packages
var morgan       = require('morgan');  //morgan is our logger, shows the requests in terinal and tells us whats working and not working
var cookieParser = require('cookie-parser'); //keeps us logged in
var bodyParser   = require('body-parser'); // 
var session      = require('express-session'); //keeps the open logged in session

var configDB = require('./config/database.js'); // how we are pulling the bd
//when we see configDB it's really the object that your getting 
var db //global variable for dB

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration --this is a function call-- the next parenthesis is you running the functionthe 

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


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
