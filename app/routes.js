module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs')
    })

    // PROFILE SECTION =========================
    // isLoggedIn middleware is function that checks if user is logged in. Wherever you put it, the user must log in to do whatever
    app.get('/profile', isLoggedIn, function(req, res) {
        
        db.collection('messages').find().sort({ thumb: -1 }).toArray((err, result) => {
            if (err) return console.log(err)
            res.render('profile.ejs', {
                user: req.user,
                messages: result
            })
        })
    })

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout(() => {
            console.log('User has logged out!')
        })
        res.redirect('/')
    })

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
        console.log(req)
        db.collection('messages').insertOne({
            name: req.body.name,
            msg: req.body.msg,
            thumb: 0
        },
        (err, result) => {
            if (err) return console.log(err)
            console.log('Saved to database')
            res.redirect('/profile') // Redirect to profile page after adding message
        })
    })

    app.put('/messages/thumbUp', (req, res) => {
        db.collection('messages').findOneAndUpdate({
            name: req.body.name,
            msg: req.body.msg
        },
        { $inc: { thumb: 1 } },
        {
            sort: { _id: -1 },
            upsert: true
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
    })

    app.put('/messages/thumbDown', (req, res) => {
        db.collection('messages').findOneAndUpdate({
            name: req.body.name,
            msg: req.body.msg
        },
        { $inc: { thumb: -1 } },
        {
            sort: { _id: -1 },
            upsert: true
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
    })

    app.delete('/messages', (req, res) => {
        db.collection('messages').findOneAndDelete({
            name: req.body.name,
            msg: req.body.msg
        },
        (err, result) => {
            if (err) return res.send(500, err)
            res.send('Message deleted!')
        })
    })

// The following is all boilerplate from passport
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') })
        })

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error, so user can try again
            failureFlash : true // allow flash messages
        }))

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') })
        })

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error, so user can try again
            failureFlash : true // allow flash messages
        }))

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user
        user.local.email    = undefined
        user.local.password = undefined
        user.save(function(err) {
            res.redirect('/profile')
        })
    })

}

// Route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()

    res.redirect('/')
}