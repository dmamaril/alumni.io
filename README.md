To Do:

- angular 
  - FACTORY: setup get, post & delete requests
  - CONTROLLERS: setup login, setup & index ctrl

- mongoose
  - create models for users
  - create collection of users

- requestHandler.js
  - handle post('/login')
    - check database
      - bcrypt + passwords ++ salt?
    - redirect to main.html 

- templates
  - login
    - hook loginController to pick up view changes
    - handle post requests
    - handle 'remember me' requests
  - signup
    - save user to database & redirect to main.html
    ** on initial sign up, set up profile
      * add linkedIn, worksAt, alumniOf & site



Changelog:

05/18/2014
- app.js
  - completed get & post request
    - deleted delete request
  

- requestHandler.js
  - add fetchUsers function using db.Users.find();



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