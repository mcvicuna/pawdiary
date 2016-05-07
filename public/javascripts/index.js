var controllers = require('./controllers/index.js');
var directives = require('./directives/index.js');
var services = require('./services/index.js');
var _ = require('underscore');

var components = angular.module('paw-diary.components', ['ng', 'ngMaterial', 'ngResource']);

_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

_.each(services, function(factory, name) {
  components.factory(name, factory);
});

var app = angular.module('paw-diary', ['paw-diary.components', 'ngRoute', 'ngMaterial']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      // this has the controller backed in
      templateUrl: 'templates/main.html'
    });
  $routeProvider.
    when('/dogs.html', {
      template: '<dogs></dogs>'
    });
  $routeProvider.
    when('/profile.html', {
      template: '<profile></profile>'
    });
  $routeProvider.
    when('/trials.html', {
      template: '<trials></trials>'
    });
});
