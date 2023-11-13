// SET UP ======================================================================
// Get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 8080
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose') // Talk to MongoDB in consistent language
var passport = require('passport')
var flash = require('connect-flash') // Flash messages for, for example, wrong password

var morgan = require('morgan') // Logs users logging in/out
var cookieParser = require('cookie-parser') // See logged-in sessions by looking at their cookies
var bodyParser = require('body-parser') // See things that come along w. form submission
var session = require('express-session')

var configDB = require('./config/database.js') // Hold database, which is in separate file

var db

// CONFIGURATION ===============================================================
mongoose.connect(configDB.url, (err, database) => {
    if (err) return console.log(err)
    db = database
    require('./app/routes.js')(app, passport, db)
}) // Connect to database via require function call

require('./config/passport')(passport) // pass passport for configuration

// Set up Express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // Read cookies (needed for auth)
app.use(bodyParser.json()) // Get info from HTML forms
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public')) // No need to write individual routes for all static files. Any file in 'public' folder is served by this line.


app.set('view engine', 'ejs') // Set up EJS for templating

// Required for passport
app.use(session({
    secret: 'rcbootcamp2021b', // Session secret
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) // Persistent login sessions
app.use(flash()) // Use connect-flash for flash messages stored in session


// LAUNCH ======================================================================
app.listen(port)
console.log('The magic happens on port ' + port)