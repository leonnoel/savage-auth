// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs'); // Off the shelf hashing tools. The most common and popular, there are other ways

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) { // Paasport determienes validity, but you can change it
    return bcrypt.compareSync(password, this.local.password); // You can add checks for length, speical characters, but this is also in the passport file on line 52- "That email is already taken". You would do this in the passport file
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema); // spits out document in user collection
