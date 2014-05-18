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

  .controller('loginController', function ($scope, hrFactory) {
  })

  .controller('signUpController', function ($scope, hrFactory) {

  })

  .controller('logOutController')

  .factory('hrFactory', function ($http) {
    return {
      get: function () {
        return $http.get('/users')
          .success(function (userData) {
            return userData;
          })
          .error(function () {
            throw 'Err @ app.js 47';
          });
      },
      post: function (data) {
        return $http.post('path', data)
          .success(function () {
            console.log('User SignUp Success!');
          })
          .error(function () {
            throw 'Err @ app.js 56';
          });
      }
    }
  })