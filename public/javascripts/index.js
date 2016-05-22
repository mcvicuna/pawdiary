var controllers = require('./controllers/index.js');
var directives = require('./directives/index.js');
var services = require('./services/index.js');
var _ = require('underscore');

var components = angular.module('paw-diary.components', ['ng', 'ngMaterial', 'ngResource', 'ngMessages']);

_.each(controllers, function (controller, name) {
  components.controller(name, controller);
});

_.each(directives, function (directive, name) {
  components.directive(name, directive);
});

_.each(services, function (factory, name) {
  components.factory(name, factory);
});


var app = angular.module('paw-diary', ['paw-diary.components', 'ngRoute', 'ngMaterial']);

// add global 401 handler
app.factory('myUnAuthInterceptor', ['$q', '$log', '$location', function ($q, $log, $location) {
  return {
    responseError: function (rejection) {
      if (rejection.status === 401) {
        $log.log('hello from 401');
        $location.path('/profile.html');
      }
      return $q.reject(rejection);
    }
  };
}]);


app.config(function ($routeProvider, $httpProvider) {
  $routeProvider.
    when('/', {
      // this has the controller backed in
      template: '<summaries></summaries>'
    });
  $routeProvider.
    when('/dogs.html', {
      template: '<dogs></dogs>'
    });
  $routeProvider.
    when('/profile.html', {
      template: '<user-info></user-info>'
    });
  $routeProvider.
    when('/trials.html', {
      template: '<trials></trials>'
    });

  $httpProvider.interceptors.push('myUnAuthInterceptor');
});
