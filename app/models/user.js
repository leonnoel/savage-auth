// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
const userSchema = new mongoose.Schema({
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  role: { type: String, enum: ['parent', 'student'], default: 'student' },
  name: { type: String, required: true },
  hasChildren: { type: String, enum: ['yes', 'no'] },
  grade: { type: String }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

