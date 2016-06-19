'use strict';

angular.module('weather-page.view1', ['ngRoute'])

.controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

  var query;
  $scope.searchComplete = false;

  $http.get('requestKey.json').then(function (res) {
    query = res.data;
  });

  var convertCtoF = function (tempInC) {
    return (tempInC * 9 / 5) + 32;
  };

  $scope.search = function () {
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.searchInput.trim() + '&APPID=' + query.key + '&units=metric')
      .then(function (res) {
        $scope.cityWeatherData = res.data;

        $scope.cityWeatherData.celsius = true;
        $scope.cityWeatherData.tempC = $scope.cityWeatherData.main.temp.toFixed(1);
        $scope.cityWeatherData.tempF = convertCtoF($scope.cityWeatherData.main.temp).toFixed(1);
        $scope.cityWeatherData.main.temp = $scope.cityWeatherData.tempC;

        $scope.searchComplete = true;
    });
  };

  $scope.switchCF = function () {
    $scope.cityWeatherData.main.temp = $scope.cityWeatherData.celsius ? $scope.cityWeatherData.tempF : $scope.cityWeatherData.tempC;

    $scope.cityWeatherData.celsius = !$scope.cityWeatherData.celsius;
  };


}]);
