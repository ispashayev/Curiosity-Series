'use strict';

var CuriositySeriesApp = angular.module('CuriositySeriesApp', ['ngRoute', 'ngMaterial', 'ngResource']);

CuriositySeriesApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
      }).
      when('/curiosities', {
        templateUrl: 'components/curiosities/curiosities.html',
        controller: 'CuriositiesController'
      }).
      when('/curiosities/goldbach', {
        templateUrl: 'components/goldbach/goldbach.html',
        controller: 'GoldbachController'
      }).
      otherwise({
        redirectTo: '/home'
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
