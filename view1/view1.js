'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

  var query;

  $http.get('requestID.json').then(function (res) {

    query = res.data;

    $http.get('http://api.openweathermap.org/data/2.5/group?id=' + query.requestIDs.toString()
            + '&APPID=' + query.key + '&units=metric').then(function (res) {

      $scope.citiesCurrent = res.data.list;
    });
  });



}]);
