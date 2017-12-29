'use strict';

CuriositySeriesApp.controller('GoldbachController', ['$scope', '$resource', '$rootScope',
  function ($scope, $resource, $rootScope) {

    $rootScope.$watch(function () {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      return true;
    });

    $scope.main.goldbach = { n: 0, history: [] };

    $scope.main.goldbach.resetResults = function () {
      return {
        success: false,
        message: ""
      };
    }

    $scope.main.goldbach.recentResult = $scope.main.goldbach.resetResults;

    /* Query the server for the prime structure of the input number. */
    $scope.main.goldbach.gbSplit = function() {

      if ($scope.main.goldbach.recentResult.success) {
        $scope.main.goldbach.history.push($scope.main.goldbach.recentResult);
      }

      /* Reset the results for the Goldbach structure. */
      $scope.main.goldbach.recentResult = $scope.main.goldbach.resetResults;

      /* Validate the number submitted by the user. */
      if ($scope.main.goldbach.n % 2 !== 0) {
        $scope.main.goldbach.recentResult.message = "Number is not even.";
        return;
      }
      if ($scope.main.goldbach.n < 4) {
        $scope.main.goldbach.recentResult.message = "Number is not large enough.";
        return;
      }

      var GoldbachPrimes = $resource('/curiosities/goldbach/:n');
      GoldbachPrimes.get({n:$scope.main.goldbach.n}, function(result) {
        $scope.main.goldbach.recentResult = result;
      });

    };

  }]);
