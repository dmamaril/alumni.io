var app = angular.module('alumnio', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'mainController',
        templateUrl: '/templates/main.html'
        // resolve: {
        //   // input checkAuth
        // }
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

  .controller('mainController', function ($scope, hrFactory) {
  })

  .controller('loginController', function ($scope, hrFactory, $location) {
    $scope.logInUser = function () {
      hrFactory.post({ username: $scope.username, password: $scope.password }, '/login')
        .success(function () {
          console.log('User authorized. Redirecting to main page!');
          $location.path('/')
        })
        .error(function () {
          console.log ('Err @ app.js 40 :: User was not authorized.');
        });
    };
  })

  .controller('signUpController', function ($scope, hrFactory) {
    $scope.signUpUser = function () {
      var data = { username: $scope.username, password: $scope.password, email: $scope.email };
      hrFactory.post(data, '/signup')
        .success(function () {
          console.log ('Sign Up Success!');
        })
        .error(function () {
          console.log ('Err @ line 50 app.js :: Sign up failed.');
        })
    }
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
          .success(function (err, user) {
            console.log('Post Success!', user);
          })
          .error(function () {
            throw 'Err @ app.js 56';
          });
      }
    }
  })