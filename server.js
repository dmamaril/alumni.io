var mongoose = require('mongoose');
var express = require('express');
var partials = require('express-partials');
var requestHandler = require('./requestHandler');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');


// ***** SETUP MONGOOSE DATABASE ***** //
mongoose.connect('mongodb://localhost/alumnio'); // sign up for mongolabs in azure
var db = mongoose.connection
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', function () { console.log ('MongoDB initialized!'); });


// ***** CONFIGURE EXPRESS SERVER ***** //
var secret = 'Shaco is King of the jungle.'

var app = express()
// app.configure(function () {
    .use(partials())
    .use(bodyParser())
    .use(morgan('dev')) // logs requests to server
    .use('/api', expressJwt({secret: secret}))
    // .set('view engine', 'ejs')
    .use(express.static(__dirname + '/client'))
  // });

  .get('/', requestHandler.renderIndex)
  // .get('/login', requestHandler.renderLogin)
  .post('/login', requestHandler.logInUser)
  
  // .get('/signup', requestHandler.renderSignUp)
  .post('/signup', requestHandler.signUpUser)
  
  .get('/api/users', requestHandler.fetchUsers)
  .post('/api/users', requestHandler.addMessage)

  .post('/api/inbox', requestHandler.fetchInbox)
// ***** END CONFIGURE EXPRESS SERVER ***** //



// ***** START NODE SERVER ***** //
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Node server initialized on port ' + port + '.');

module.exports = db;