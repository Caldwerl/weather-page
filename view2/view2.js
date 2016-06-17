'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {

  var query;
  var temp;

  $http.get('requestID.json').then(function (res) {

    query = res.data;
    $scope.cities5Day = [];
    for (var i = 0; i < query.requestIDs.length; i++) {

      $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=' + query.requestIDs[i].toString()
            + '&APPID=' + query.key + '&units=metric&cnt=5').then(function (res) {
        console.log(res.data);
        $scope.cities5Day.push(res.data);
      });
    }
  });
}]);
