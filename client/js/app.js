var app = angular.module('alumnio', ['ngRoute'])


  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'mainController',
        templateUrl: '/templates/main.html',
        resolve: {
          isAuth: function (authInterceptor, $window) {
            if (!$window.sessionStorage.token) {
              return authInterceptor.login();
            }
          },
          users: function (hrFactory) {
            console.log('Checking for active session token...');
            return hrFactory.get('/api/users').then(function (users) { return users.data; });
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
      .when('/inbox', {
        controller: 'inboxController',
        templateUrl: '/templates/inbox.html'
      })
      .when('/logout', {
        controller: 'logOutController',
        templateUrl: '/templates/logout.html'
      })
      .otherwise({ redirectTo: '/login' });
  }])

  .controller('mainController', function ($scope, users, hrFactory, $window, $timeout) {
    $scope.users = users;
    $scope.showForm = false;

    $scope.renderForm = function (id, firstname, lastname) {
      $scope.fullname = firstname + ' ' + lastname;
      if (id !== $scope.userId) {
        $scope.userId = id;
      } else { $scope.showForm = !$scope.showForm; }
    };

    $scope.clearForm = function () { $scope.msg = ''; }

    $scope.sendMsg = function () {
      var message = {
        _id: $scope.userId,
        name: $scope.fullname,
        message: $scope.msg,
        from: $window.sessionStorage.user
      };
      $scope.msg = 'Message Sent!';
      hrFactory.post(message, '/api/users')
        .success(function () {
          console.log('Message sent!')
        })
        .error(function () {
          console.log('wtufuuuu')
        })
    }
  })

  .controller('loginController', function ($scope, hrFactory, $location, $window, $rootScope) {
    $scope.logInUser = function () {
      hrFactory.post({ email: $scope.email, password: $scope.password }, '/login')
        .success(function (data) {
          $window.sessionStorage.token = data.token;
          console.log(data);
          $window.sessionStorage.user = data.user;
          app.isAuthenticated = false;
          $location.path('/');
        })
        .error(function () {
          delete $window.sessionStorage.token
          $location.path('/login');
          console.log ('Err @ app.js loginController :: User was not authorized.');
        });
    }
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
          console.log ('Err @ app.js signUpController :: Sign up failed.');
        });
    };
  })

  .controller('inboxController', function ($scope, $window) {
    $scope.user = $window.sessionStorage.user;
  })


  .controller('logOutController', function ($scope, $location, $window) {
    $scope.logOut = function () {
      delete $window.sessionStorage.token;
      delete $window.sessionStorage.user;
      $location.path('/login');
    };
  })

  .factory('hrFactory', function ($http) {
    return {
      get: function (path) {
        return $http.get(path)
          .success(function (userData) {
            return userData;
          })
          .error(function () {
            throw 'Err @ app.js 134';
          });
      },
      post: function (data, path) {
        return $http.post(path, data)
          .success(function (users) {
            console.log('Post Success!');
          })
          .error(function () {
            throw 'Err @ app.js 143';
          });
      }
    }
  })

  .factory('authInterceptor', function ($rootScope, $q, $window, $location) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          $location.path('/login');
        }
        return response || $q.when(response); 
      },
      login: function () {
        $location.path('/login');
      }
    }
  })

  .filter('capitalize', function() {
   return function(input, scope) {
     if (input !== null) {
       input = input.toLowerCase();
       return input.substring(0,1).toUpperCase()+input.substring(1);
     }
   }
  });