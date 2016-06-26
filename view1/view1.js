'use strict';

angular.module('weather-page.view1', ['ngRoute'])

.controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

  var query, tempC, tempF, temp_minC, temp_minF, temp_maxC, temp_maxF;
  $scope.searchComplete = false;

  $http.get('requestKey.json').then(function (res) {
    query = res.data;
  });

  var convertCtoF = function (tempInC) {
    return (tempInC * 9 / 5) + 32;
  };

  var setTemps = function (currTemp, minTemp, maxTemp) {
    tempC = currTemp.toFixed(1);
    tempF = convertCtoF(currTemp).toFixed(1);
    temp_minC = minTemp.toFixed(1);
    temp_minF = convertCtoF(minTemp).toFixed(1);
    temp_maxC = maxTemp.toFixed(1);
    temp_maxF = convertCtoF(maxTemp).toFixed(1);
  };

  $scope.search = function () {
    $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.searchInput.trim() + '&APPID=' + query.key + '&units=metric')
      .then(function (res) {
        $scope.cityWeatherData = angular.copy(res.data);

        $scope.cityWeatherData.celsius = true;

        setTemps($scope.cityWeatherData.main.temp, $scope.cityWeatherData.main.temp_min, $scope.cityWeatherData.main.temp_max);

        $scope.cityWeatherData.main.temp = tempC;
        $scope.cityWeatherData.main.temp_min = temp_minC;
        $scope.cityWeatherData.main.temp_max = temp_maxC;

        $scope.searchComplete = true;
    });
  };

  $scope.switchCF = function () {
    $scope.cityWeatherData.main.temp = $scope.cityWeatherData.celsius ? tempF : tempC;
    $scope.cityWeatherData.main.temp_min = $scope.cityWeatherData.celsius ? temp_minF : temp_minC;
    $scope.cityWeatherData.main.temp_max = $scope.cityWeatherData.celsius ? temp_maxF : temp_maxC;

    $scope.cityWeatherData.celsius = !$scope.cityWeatherData.celsius;
  };


}]);
