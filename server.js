// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose'); // different way of talking to databse
const passport = require('passport');
const flash    = require('connect-flash'); //error message

const morgan       = require('morgan'); //logs every request on app
const cookieParser = require('cookie-parser'); //helps look at cookies
const bodyParser   = require('body-parser');
const session      = require('express-session'); //once user logs in, you want to make sure they are still logged in. whn they log out it is terminated. jump around from page to page w/o logging out

const configDB = require('./config/database.js'); //object that has url property and db property in this file

let db

// configuration ===============================================================
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(configDB.url, (err, database) => { //connecting to database. pass in url from configdb
  if (err) return console.log(err)
  db = database //connection to database is stored in db
  require('./app/routes.js')(app, passport, db); //run function from routes js
  //creates API for app
}); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true })); // use to get url
app.use(express.static('public'))


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ // stay logged in
    secret: 'rcbootcamp2021b', // session secret-- makes the session unique while logged in
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
