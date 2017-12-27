'use strict';

var CuriositySeriesApp = angular.module('CuriositySeriesApp', ['ngRoute', 'ngMaterial', 'ngResource']);

CuriositySeriesApp.directive("curiosityMath", function () {
  return {
    restrict: "A",
    controller: ["$scope", "$element", "$attrs",
      function($scope, $element, $attrs) {
        $scope.$watch($attrs.curiosityMath, function(texExpression) {
          $element.html(texExpression);
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
        });
      }]
    };
});

CuriositySeriesApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/curiosities', {
        templateUrl: 'components/curiosities/curiosities.html',
        controller: 'CuriositiesController'
      }).
      when('/curiosities/goldbach', {
        templateUrl: 'components/goldbach/goldbach.html',
        controller: 'GoldbachController'
      }).
      otherwise({
        redirectTo: '/curiosities'
      });
  }]);

CuriositySeriesApp.controller('MainController', ['$scope', '$location',
  function($scope, $location) {
    $scope.main = {};
    $scope.main.title = 'Curiosity Series';
    $scope.main.curiosities = [];

    $scope.main.navigate = function(curiosityLink) {
      switch (curiosityLink) {
        case "goldbach":
          $location.path("/curiosities/goldbach");
          break;
        default:
          console.log("That doesn't exist.");
      }
    };

  }]);
