// var crypto = require('crypto');
// var bycrpt = require('bcrypt');
// var util = require('./util.js');
var db = require('./server');
var express = require('express');
var UserModel = require('./mongoose/Users');


exports.renderIndex = function (req, res) {
  console.log ('Redirecting')
  res.sendfile('./client/templates/index.html');
};

exports.logInUser = function (req, res) {
  UserModel.findOne({username: req.body.username}, function (err, user) {
    if (user) {
      user.comparePassword(req.body.password, function (isMatch) {
        if (isMatch) { res.send('hello') }
          else { console.log ('Incorrect Password'); }
      })
    } else if (err) { console.log ('Error @ Line 25 requestHandler.js')}
  });
};

exports.signUpUser = function (req, res) {
  console.log("In sign up user")
  
  UserModel.findOne({username: req.body.username}, 'username', function (err, exists) {
    if (!exists) {
      var newUser = new UserModel ({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      });
      newUser.save(function (err, user){
        console.log('saved ', user);
      });      
    }
  });

};

exports.fetchUsers = function (req, res) {
  db.Users.find({}, function (err, data) {
    res.send(200, data);
  });
};

exports.saveUser = function (req, res) {

};