var db = require('../server'); // require mongoose path
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id : Number,
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    linkedIn: String,
    worksAt: String,
    cohort: Number,
    site: String
  });

userSchema.pre('save', function (next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
      next();
    });
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
