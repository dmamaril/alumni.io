***** TO DO ****** 

- Index.html
  - navbar // header with logout?

- Main.html
  - design divs to render out all the related user info
    - set div height
    - set autoscroll
    - on click display others who may be in the same company

- Signup.html
  - hide welcome until forename is form is complete
  - ngActive a thing? 
  - company logos

- ngAnimate
  - http://hendrixer.github.io/

- Session Tokens
  - check for valid user token else relogin

- logOutController
  - is this needed? should just be a part of index.html

***** NIGHTMARE MODE *****
- Passport Linked-In
  
- Send Message functionality
  - wahooooaoohhh tough
  - add an inbox Array [] to schema?



***** CHANGE LOG ******

5/19/2014
  - signup.html
    - basic template complete

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
    - resolves $http.get request prior to rendering '/main'

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