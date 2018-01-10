"use strict";

CuriositySeriesApp.controller("GraphIsomorphismController", ["$scope", "$rootScope",
  function($scope, $rootScope) {

    $rootScope.$watch(function () {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      return true;
    });

    function resetGraphIsomorphism() {
      $scope.main.graphIsomorphism = {
        addingVertex: false,
        addingEdge: false,
        vertexNew: undefined,
        vertexOne: undefined,
        vertexTwo: undefined
      };
      
      $scope.main.graphIsomorphism.cygraph1 = cytoscape({
        container: document.getElementById("cy-graph-isomorphism-1"),
        elements: [],
        style: [{
          selector: "node",
          style: {
            shape: "hexagon",
            "background-color": "red",
            label: "data(id)"
          }
        }]
      });

    };

    resetGraphIsomorphism();


    $scope.main.graphIsomorphism.addVertex = function() {
      $scope.main.graphIsomorphism.addingVertex = true;
      $scope.main.graphIsomorphism.addingEdge = false;
    };

    $scope.main.graphIsomorphism.addEdge = function() {
      $scope.main.graphIsomorphism.addingVertex = false;
      $scope.main.graphIsomorphism.addingEdge = true;
    };

    $scope.main.graphIsomorphism.submit = function() {
      if ($scope.main.graphIsomorphism.addingVertex
          && $scope.main.graphIsomorphism.addingEdge) {
        /* This is bad and shouldn't happen. Reset everything. */
        resetGraphIsomorphism();
      } else if ($scope.main.graphIsomorphism.addingVertex) {
        /* Add vertex */
        $scope.main.graphIsomorphism.cygraph1.add({
          data: {
            id: $scope.main.graphIsomorphism.vertexNew
          }
        }).cy().layout({
          name: 'random'
        }).run();
      } else if ($scope.main.graphIsomorphism.addingEdge) {
        /* Add edge */
        $scope.main.graphIsomorphism.cygraph1.add({
          data: {
            source: $scope.main.graphIsomorphism.vertexOne,
            target: $scope.main.graphIsomorphism.vertexTwo
          }
        });
      } else {
        /* This is also bad and shouldn't happen. Reset everything. */
        resetGraphIsomorphism();
      }
    };

  }]);
