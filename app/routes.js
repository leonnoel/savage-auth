module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================



// POST – add a new message
app.post('/messages', (req, res) => {
  const name = req.body.name?.trim();
  const msg  = req.body.msg?.trim();

  if (!name || !msg) {
    console.log('Empty name/msg – ignored');
    return res.redirect('/profile');
  }

  db.collection('messages')
    .insertOne({ name, msg, thumbUp: 0 })
    .then(result => {
      console.log('Message saved', result.insertedId);
      res.redirect('/profile');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('DB error');
    });
});

// PUT – thumbs-up (increment)
app.put('/messages', (req, res) => {
  const name = req.body.name?.trim();
  const msg  = req.body.msg?.trim();
  const cur  = Number(req.body.thumbUp) || 0;

  db.collection('messages')
    .findOneAndUpdate(
      { name, msg },
      { $set: { thumbUp: cur + 1 } },
      { sort: { _id: -1 }, upsert: false }
    )
    .then(result => {
      if (!result.value) return res.status(404).json('Not found');
      res.json('Success');
    })
    .catch(err => {
      console.error(err);
      res.status(500).json('Error');
    });
});

// PUT – thumbs-down (decrement)  →  /messagesDown  (same as reference)
app.put('/messagesDown', (req, res) => {
  const name = req.body.name?.trim();
  const msg  = req.body.msg?.trim();
  const cur  = Number(req.body.thumbUp) || 0;

  db.collection('messages')
    .findOneAndUpdate(
      { name, msg },
      { $set: { thumbUp: cur - 1 } },
      { sort: { _id: -1 }, upsert: false }
    )
    .then(result => {
      if (!result.value) return res.status(404).json('Not found');
      res.json('Success');
    })
    .catch(err => {
      console.error(err);
      res.status(500).json('Error');
    });
});

// DELETE – remove a message
app.delete('/delete', (req, res) => {          // <-- note the /delete path
  const name = req.body.name?.trim();
  const msg  = req.body.msg?.trim();

  db.collection('messages')
    .deleteOne({ name, msg })
    .then(result => {
      console.log('Delete result', result);
      if (result.deletedCount === 0) {
        return res.json('No message to delete');
      }
      res.json('Message deleted!');
    })
    .catch(err => {
      console.error(err);
      res.status(500).json('Error deleting message');
    });
});
  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
