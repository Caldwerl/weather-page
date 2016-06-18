'use strict';

// Declare app level module which depends on views, and components
angular.module('weather-page', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);