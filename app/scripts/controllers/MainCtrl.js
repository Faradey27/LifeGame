'use strict';

angular.module('lifeGame')
.controller('MainCtrl',['$scope','Population', function($scope, Population) {
    $scope.activeItem = "books";
    function createCanvasContext() {
        var canvas = document.getElementById('field');
        $scope.canvas = canvas.getContext("2d");
        var populationConfig = {
            number: 100,
            predatorsProcent: 15,
            herbivoresProcent: 55
        };
        Population.create(populationConfig,$scope.canvas); 
        Population.paintAllPersons($scope.canvas);
    }

    createCanvasContext();

}]);
