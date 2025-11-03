

//added this section as a suggestion from chat GPT because of a db undefined error I could not figure out why. I followed its instructions which allowed me refactor most of my code. I refactored user.js, this file, server.js and a bit of passport to get it working again with its assistance as well.
const mongoose = require('mongoose');
const User = mongoose.model('User'); // from your user model
const Message = mongoose.model('Message', new mongoose.Schema({
  name: String,
  msg: String,
  thumbUp: { type: Number, default: 0 },
  thumbDown: { type: Number, default: 0 }
}));

module.exports = function (app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, async (req, res) => {
    try {
      const result = await Message.find(); // or User.find() if you really mean users
      res.render('profile.ejs', { user: req.user, messages: result });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error loading profile');
    }
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================
  //used chat GPT to help me debug this section
  // POST MESSAGE
  app.post('/messages', async (req, res) => {
    try {
      await Message.create({
        name: req.body.name,
        msg: req.body.msg,
        thumbUp: 0,
        thumbDown: 0
      });
      console.log('saved to database');
      res.redirect('/profile');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving message');
    }
  });

  // PUT (THUMB UP)
  app.put('/messages', async (req, res) => {
    try {
      const result = await Message.findOneAndUpdate(
        { name: req.body.name, msg: req.body.msg },
        { $inc: { thumbUp: 1 } },
        { new: true, upsert: true }
      );
      res.json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  app.put('/messagesDown', async (req, res) => {
    try {
      const result = await Message.findOneAndUpdate(
        { name: req.body.name, msg: req.body.msg },
        { $inc: { thumbUp: -1 } },
        { new: true, upsert: true }
      );
      res.json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  // DELETE
  app.delete('/messages', async (req, res) => {
    try {
      await Message.findOneAndDelete({ name: req.body.name, msg: req.body.msg });
      res.send('Message deleted!');
    } catch (err) {
      res.status(500).send(err);
    }
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
