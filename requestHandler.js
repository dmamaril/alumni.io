// var crypto = require('crypto');
// var bycrpt = require('bcrypt');
// var util = require('./util.js');
var db = require('./server');
var express = require('express');
var UserModel = require('./mongoose/Users');


exports.renderIndex = function (req, res) {
  res.sendfile(__dirname + '/client/templates/index.html');
};

exports.logInUser = function (req, res) {
  // search db for username and match
  UserModel.findOne({username: req.body.username}, function (err, data) {
    if (data) {
      UserModel.comparePassword(req.body.password, function (isMatch) {
        if (isMatch) { console.log ('Password matches'); }
          else { console.log ('Incorrect Password'); }
      })
    } else if (err) { console.log ('Error @ Line 25 requestHandler.js')}
  });
};

exports.signUpUser = function (req, res) {
  var newUser = new UserModel ({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  newUser.save(function (err, user){
    console.log('saved ', user);
  });
};

exports.fetchUsers = function (req, res) {
  db.Users.find({}, function (err, data) {
    res.send(200, data);
  });
};

exports.saveUser = function (req, res) {

};