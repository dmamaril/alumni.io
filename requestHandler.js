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
  UserModel.findOne({email: req.body.email}, function (err, user) {
    if (user) {
      user.comparePassword(req.body.password, function (isMatch) {
        if (isMatch) { res.send(user) }
          else { console.log ('Incorrect Password'); }
      })
    } else if (err) { console.log ('Error @ Line 25 requestHandler.js')}
  });
};

exports.signUpUser = function (req, res) {
  UserModel.findOne({email: req.body.email}, 'email', function (err, exists) {
    if (!exists) {
      var newUser = new UserModel ({ 
        email: req.body.email, 
        password: req.body.password, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        cohort: req.body.cohort,
        worksAt: req.body.worksAt,
        linkedIn: req.body.linkedIn,
        site: req.body.site
      });
      newUser.save(function (err, user){
        console.log('Saving user...' );
        console.log(user);
        console.log('Saved!');
        res.send(user);
      });      
    }
  });
};

exports.fetchUsers = function (req, res) {
  console.log('fetch users')
  UserModel.find({}, function (err, users) {
    res.send(users);
  });
};

exports.addMessage = function (req, res) {
  var message = {from: req.body.from, message: req.body.message};
  UserModel.update({ _id: req.body._id }, { $push: {messages: message} }, function () {});
  res.send(req.body.message);
}