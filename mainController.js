"use strict";

var CuriositySeriesApp = angular.module("CuriositySeriesApp", ["ngRoute", "ngMaterial", "ngResource"]);

CuriositySeriesApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme("default")
    .primaryPalette("teal")
    .accentPalette("deep-orange");
});

CuriositySeriesApp.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/home", {
        templateUrl: "components/home/home.html",
        controller: "HomeController"
      }).
      when("/curiosities", {
        templateUrl: "components/curiosities/curiosities.html",
        controller: "CuriositiesController"
      }).
      when("/curiosities/goldbach-conjecture", {
        templateUrl: "components/goldbach-conjecture/goldbach-conjecture.html",
        controller: "GoldbachConjectureController"
      }).
      when("/curiosities/riemann-hypothesis", {
        templateUrl: "components/riemann-hypothesis/riemann-hypothesis.html",
        controller: "RiemannHypothesisController"
      }).
      when("/curiosities/graph-isomorphism", {
        templateUrl: "components/graph-isomorphism/graph-isomorphism.html",
        controller: "GraphIsomorphismController"
      }).
      otherwise({
        redirectTo: "/home"
      });
  }]);

CuriositySeriesApp.controller('MainController', ['$scope', '$location',
  function($scope, $location) {
    $scope.main = {};
    $scope.main.title = 'Curiosity Series';
    $scope.main.curiosities = [];

    $scope.main.navigate = function(curiosityLink) {
      switch (curiosityLink) {
        case "goldbach-conjecture":
          $location.path("/curiosities/goldbach-conjecture");
          break;
        case "graph-isomorphism":
          $location.path("/curiosities/graph-isomorphism");
          break;
        case "riemann-hypothesis":
          $location.path("/curiosities/riemann-hypothesis");
          break;
        default:
          console.log("That doesn't exist.");
      }
    };

  }]);
