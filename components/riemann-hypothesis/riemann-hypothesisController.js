"use strict";

CuriositySeriesApp.controller("RiemannHypothesisController", ["$scope", "$rootScope",
  function ($scope, $rootScope) {

    $rootScope.$watch(function () {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      return true;
    });

  }]);
