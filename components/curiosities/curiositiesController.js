"use strict";

CuriositySeriesApp.controller("CuriositiesController", ["$scope", "$resource",
  function ($scope, $resource) {
    var Curiosities = $resource('/curiosities');
    Curiosities.query(function (response) {
      $scope.main.curiosities = response;
    });

  }]);
