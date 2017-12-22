'use strict';

CuriositySeriesApp.controller('GoldbachController', ['$scope', '$resource',
  function ($scope, $resource) {

    $scope.main.goldbach = { n: 0 };

    $scope.main.goldbach.resetResults = function () {
      return {
        success: false,
        message: ""
      };
    }

    $scope.main.goldbach.results = $scope.main.goldbach.resetResults;

    /* Query the server for the prime structure of the input number. */
    $scope.main.goldbach.gbSplit = function() {

      /* Reset the results for the Goldbach structure. */
      $scope.main.goldbach.results = $scope.main.goldbach.resetResults;

      /* Validate the number submitted by the user. */
      if ($scope.main.goldbach.n % 2 !== 0) {
        $scope.main.goldbach.results.message = "Number is not even.";
        return;
      }
      if ($scope.main.goldbach.n < 4) {
        $scope.main.goldbach.results.message = "Number is not large enough.";
        return;
      }

      var GoldbachPrimes = $resource('/curiosities/goldbach/:n');
      GoldbachPrimes.get({n:$scope.main.goldbach.n}, function(result) {
        $scope.main.goldbach.results = result;
      });

    };

  }]);
