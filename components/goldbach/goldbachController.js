'use strict';

CuriositySeriesApp.controller('GoldbachController', ['$scope', '$resource',
  function ($scope, $resource) {

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

    $scope.main.goldbach.textAfter1 =
      "It's interesting to note that the Goldbach conjecture implies the \
      existence of a function $f$ that maps a pair of primes (p,q) to an even \
      number n. However, such a function cannot be a one-to-one mapping."

    $scope.main.goldbach.textAfter2 =
      "Take for example the number 14. There are two pairs of primes such that \
      their sum is equal to 14: \
      $$ \
      (3,11): 3 + 11 = 14 \
      (7,7): 7 + 7 = 14 \
      $$"

    $scope.main.goldbach.textAfter3 =
      "In math, we call a one-to-one mapping a bijective function, or just a \
      bijection. We care about bijections because their inverses map to \
      exactly one element. However, in our case there is no straightforward \
      way of inverting $f$. Every even number must have at least one prime \
      pair solutions. Such a function is said to be surjective."

  }]);
