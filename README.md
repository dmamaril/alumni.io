To Do:

- angular 
  - FACTORY: setup get, post & delete requests
  - CONTROLLERS: setup login, setup & index ctrl
  - resolve fetchData prior to loading in Divs

- mongoose
  - create models for users

- requestHandler.js
  - handle post('/login')
    - check database
      - bcrypt + passwords ++ salt?
    - redirect to main.html 

- templates
  - login
    - handle 'remember me' requests

  - signup
    - save user to database & redirect to main.html
    - on 'submit' run second half of sign up page
    ** on initial sign up, set up profile
      * add linkedIn, worksAt, alumniOf & site



Changelog:

05/18/2014
- Users.js
  - bcrypt user password prior to saving to database
  - comparePassword on login
  - add 'fullname' to schema
  - remove username // use e-mail as primary instead

- server.js
  - added package.json file for node modules
  - added dependencies [morgan, body-parser]

- app.js
  - completed get & post request
    - deleted delete request
    - redirects to main.html on success login
    - require all info on signup
    - renders users in dbs when redirected to '/main'

  - hrFactory
    - refractored to be more dynamic
      - takes 'path' && data variables for post

  - loginUser && loginController
    - loginController now picks up view input
    - loginController now issues post requests to the server
      - on submit() exports.logInUser is executed
    
- requestHandler.js
  - add fetchUsers function using db.Users.find();
  - set isSetUp on sign up


05/17/2014
- signup template
  - template included
  - required email 

- login template
  - template included

- express 4.0 changes 
  - removed app.configure(function() {...})
  - app.use(express.bodyParser()) now needs to be installed separately
  - static not working // probably also needs to be installed separately



05/16/2014
- setup routes for '/', '/login', '/signup'
- setup mongoose connection
- setup express server
- angular
  - setup module
  - setup mainCtrl
  - configured routes
- index.html with ngView