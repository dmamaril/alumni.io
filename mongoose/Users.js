var db = require('../../server'); // require mongoose path
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id : Number,
    username: String,
    password: String,
    email: String,
    linkedIn: String,
    worksAt: String,
    alumniOf: String,
    site: String
  });

userSchema.methods.initialize = function(){
  this.on('creating', this.hashPassword);
};

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function(){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
      this.save();
    });
};

var User = mongoose.model('User', userSchema);

var Users = Backbone.Collection.extend({ model: User });

module.exports = User;
