'use strict';

// Declare app level module which depends on views, and components
angular.module('weather-page', [
  'ngRoute',
  'weather-page.view1'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/search', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        })
        .otherwise({redirectTo: '/search'});
}]);
