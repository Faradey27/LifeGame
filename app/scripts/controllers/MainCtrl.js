'use strict';

angular.module('lifeGame')
.controller('MainCtrl',['$scope','Population','Model', function($scope, Population, Model) {
    $scope.config = null;
    $scope.canvas = null;

    function loadConfig() {
        Model.loadConfig().then(function(config){
            $scope.config = config;
            createPopulation();
        });
    }

    function createPopulation() {
        var canvas = document.getElementById('field');
        $scope.canvas = canvas.getContext("2d");
        Population.create($scope.config, $scope.canvas); 
    }

    loadConfig();
}]);
