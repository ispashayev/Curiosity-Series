'use strict';

var gcApp = angular.module('gcApp', []);

gcApp.controller('MainController', ['$scope', function($scope) {
    $scope.main = {};
    $scope.main.title = 'The Goldbach Conjecture';
    $scope.even_num = 0;
    $scope.result = undefined;

    $scope.gbSplit = function(n) {
      if (n % 2 !== 0) {
        $scope.result = "Number is not even.";
      } else {
        $scope.result = "Number is even.";
      }
    };

  }]);
