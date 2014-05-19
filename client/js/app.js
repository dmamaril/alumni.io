var app = angular.module('alumnio', ['ngRoute'])


  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'mainController',
        templateUrl: '/templates/main.html',
        resolve: {
          users: function (hrFactory) {
            return hrFactory.get('/users').then(function (users) { return users.data; });
          }
        }
      })
      .when('/login', {
        controller: 'loginController',
        templateUrl: '/templates/login.html'
      })
      .when('/signup', {
        controller: 'signUpController',
        templateUrl: '/templates/signup.html'
      })
      .when('/logout', {
        controller: 'logOutController',
        templateUrl: '/templates/logout.html'
      })
      .otherwise({ redirectTo: '/login' })
  }])

  .controller('mainController', function ($scope, users) {
    $scope.users = users;
  })

  .controller('loginController', function ($scope, hrFactory, $location) {
    $scope.logInUser = function () {
      hrFactory.post({ email: $scope.email, password: $scope.password }, '/login')
        .success(function () {
          console.log('User authorized. Redirecting to main page!');
          $location.path('/');
        })
        .error(function () {
          console.log ('Err @ app.js 40 :: User was not authorized.');
        });
    };
  })

  .controller('signUpController', function ($scope, hrFactory, $location) {
    // Toggle between forms //
    $scope.step2 = false;
    $scope.step1Submit = function () { $scope.step2 = true; };


    $scope.signUpUser = function () {
      var userData = { 
        email: $scope.email, 
        password: $scope.password, 
        firstname: $scope.firstname,
        lastname: $scope.lastname,
        cohort: $scope.cohort,
        worksAt: $scope.worksAt,
        linkedIn: $scope.linkedIn,
        site: $scope.site
      };

      hrFactory.post(userData, '/signup')
        .success(function () {
          console.log ('Sign Up Success!');
          $location.path('/');
        })
        .error(function () {
          console.log ('Err @ line 50 app.js :: Sign up failed.');
        });
    };
  })

  .controller('logOutController')

  .factory('hrFactory', function ($http) {
    return {
      get: function (path) {
        return $http.get(path)
          .success(function (userData) {
            return userData;
          })
          .error(function () {
            throw 'Err @ app.js 47';
          });
      },
      post: function (data, path) {
        return $http.post(path, data)
          .success(function (users) {
            console.log('Post Success!', users);
          })
          .error(function () {
            throw 'Err @ app.js 56';
          });
      }
    }
  });

  // https://coderwall.com/p/f6brkg
  // .service('SessionService', function(){
  //   var userIsAuthenticated = false;

  //   this.setUserAuthenticated = function(value){
  //       userIsAuthenticated = value;
  //   };

  //   this.getUserAuthenticated = function(){
  //       return userIsAuthenticated;
  //   };