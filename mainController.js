'use strict';

var CuriositySeriesApp = angular.module('CuriositySeriesApp', ['ngRoute', 'ngMaterial', 'ngResource']);

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
      /* TODO: Verify validity of curiosityLink. Display dropdown from top of
               window if the link does not exit. */
      switch (curiosityLink) {
        case "goldbach":
          $location.path("/curiosities/goldbach");
          break;
        default:
          console.log("That doesn't exist.");
      }
    };

  }]);
