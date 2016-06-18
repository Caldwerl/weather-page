'use strict';

angular.module('weather-page.view1', ['ngRoute'])

.controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

  var query;
  $scope.searchComplete = false;

  $http.get('requestKey.json').then(function (res) {
    query = res.data;
  });

  $scope.search = function () {
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.searchInput.trim() + '&APPID=' + query.key + '&units=metric')
      .then(function (res) {
        $scope.cityWeatherData = res.data;
        $scope.searchComplete = true;
    });
  };


}]);
