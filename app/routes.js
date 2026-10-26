// ObjectId comes from mongoose so it matches the MongoDB driver mongoose uses for db
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray()
          .then(result => {
            res.render('profile.ejs', {
              user : req.user,
              messages: result
            })
          })
          .catch(err => {
            console.error('MongoDB error loading messages:', err)
            res.status(500).send('Could not load messages')
          })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res, next) {
        // passport 0.6+ logs out asynchronously, so redirect once it's done
        req.logout(err => {
          if (err) return next(err)
          console.log('User has logged out!')
          res.redirect('/');
        });
    });

// message board routes ===============================================================
// The vote and delete routes are called with fetch from main.js, so they use
// isLoggedInApi (401 JSON) instead of isLoggedIn (redirect to the home page).
// Messages are found by their unique _id, which main.js reads from data-id in profile.ejs.

    app.post('/messages', isLoggedIn, (req, res) => {
      db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0})
        .then(result => {
          console.log('saved to database')
          res.redirect('/profile')
        })
        .catch(err => {
          console.error('MongoDB error saving message:', err)
          res.status(500).send('Could not save message')
        })
    })

    // Thumbs up: $inc adds 1 to the stored count, so a stale page can't overwrite votes.
    // No upsert, so a bad id is a 404 instead of a new junk message.
    app.put('/messages', isLoggedInApi, (req, res) => {
      voteOnMessage(req, res, 'thumbUp')
    })

    // Thumbs down: same as thumbs up, on the thumbDown field
    app.put('/messages/thumbDown', isLoggedInApi, (req, res) => {
      voteOnMessage(req, res, 'thumbDown')
    })

    app.delete('/messages', isLoggedInApi, (req, res) => {
      const _id = toObjectId(req.body.id)
      if (!_id) return res.status(400).json({error: 'Missing or invalid message id'})
      db.collection('messages').findOneAndDelete({_id: _id})
        .then(result => {
          // the driver resolves to the deleted document, or null if nothing matched
          if (!result) return res.status(404).json({error: 'Message not found'})
          res.json({message: 'Message deleted!'})
        })
        .catch(err => {
          console.error('MongoDB error during delete:', err)
          res.status(500).json({error: 'Could not delete message'})
        })
    })

    function voteOnMessage(req, res, field) {
      const _id = toObjectId(req.body.id)
      if (!_id) return res.status(400).json({error: 'Missing or invalid message id'})
      db.collection('messages')
        .findOneAndUpdate({_id: _id}, {$inc: {[field]: 1}}, {returnDocument: 'after'})
        .then(result => {
          // the driver resolves to the updated document, or null if nothing matched
          if (!result) return res.status(404).json({error: 'Message not found'})
          res.json(result)
        })
        .catch(err => {
          console.error(`MongoDB error during ${field}:`, err)
          res.status(500).json({error: 'Could not save vote'})
        })
    }

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res, next) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save().then(function() {
            res.redirect('/profile');
        }).catch(next);
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

// same check for fetch requests: answer with 401 JSON, since a redirect to the
// home page would look like a successful response to main.js
function isLoggedInApi(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.status(401).json({error: 'You must be logged in'});
}

// turns the id string from main.js into an ObjectId, or null if it isn't valid
function toObjectId(id) {
    return ObjectId.isValid(id) ? new ObjectId(id) : null
}
