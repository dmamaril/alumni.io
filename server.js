var mongoose = require('mongoose');
var express = require('express');
var partials = require('express-partials');
var requestHandler = require('./requestHandler');
var bodyParser = require('body-parser');
var morgan = require('morgan');


// ***** SETUP MONGOOSE DATABASE ***** //
mongoose.connect('mongodb://localhost/alumnio'); // sign up for mongolabs in azure
var db = mongoose.connection
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', function () { console.log ('MongoDB initialized!'); });


// ***** CONFIGURE EXPRESS SERVER ***** //
var app = express()
// app.configure(function () {
    .use(partials())
    .use(bodyParser())
    .use(morgan('dev')) // logs requests to server
    // .set('view engine', 'ejs')
    .use(express.static(__dirname + '/client'))
  // });

  .get('/', requestHandler.renderIndex)
  // .get('/login', requestHandler.renderLogin)
  .post('/login', requestHandler.logInUser)
  
  // .get('/signup', requestHandler.renderSignUp)
  .post('/signup', requestHandler.signUpUser)
  
  .get('/users', requestHandler.fetchUsers)
  .post('/users', requestHandler.addMessage);
// ***** END CONFIGURE EXPRESS SERVER ***** //



// ***** START NODE SERVER ***** //
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Node server initialized on port ' + port + '.');

module.exports = db;