// var crypto = require('crypto');
// var bycrpt = require('bcrypt');
// var util = require('./util.js');
var db = require('./server.js');
var express = require('express');


exports.renderIndex = function (req, res) {
  res.sendfile(__dirname + '/client/templates/index.html');
};

exports.logInUser = function (req, res) {

};

exports.signUpUser = function (req, res) {

};

exports.fetchUsers = function (req, res) {
  db.Users.find({}, function (err, data) {
    res.send(200, data);
  });
};

exports.saveUser = function (req, res) {

};