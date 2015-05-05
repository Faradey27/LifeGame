'use strict';

angular.module('lifeGame')
.service('Population', ['Person', 'MAX_POPULATION_NUMBER', 'FIELD_WIDTH','FIELD_HEIGHT',function(Person, MAX_POPULATION_NUMBER, FIELD_WIDTH, FIELD_HEIGHT){
  var self = this;

  this.create = function(populationConfig, canvas) {
    self.number = populationConfig.number;
    self.predatorsProcent = populationConfig.predatorsProcent;
    self.herbivoresProcent = populationConfig.herbivoresProcent;
    self.residents = [];

    var numberOfPredators = (populationConfig.predatorsProcent / 100) * populationConfig.number;
    var numberOfHerbivores = (populationConfig.herbivoresProcent / 100) * populationConfig.number;
    var numberOfOmnivorous = self.number - numberOfHerbivores - numberOfPredators;
    var canvas = canvas;
    var predatorsCounter = 0;
    var herbivoresCounter = 0;
    for (var i = 0; i < this.number; i++) {
      var id = Math.floor(Math.random() * MAX_POPULATION_NUMBER) + "_" + i;
      var type = "predators";
      if (predatorsCounter <= numberOfPredators) {
        type = "predators";
        predatorsCounter++;
      } else if (herbivoresCounter <= numberOfHerbivores) {
        type = "herbivores";
        herbivoresCounter++;
      } else {
        type = "omnivorous"
      }

      var position = {
        x: Math.floor(Math.random() * FIELD_WIDTH),
        y: Math.floor(Math.random() * FIELD_HEIGHT)
      }
      var colorHash = {
        herbivores: "#00FF00",
        predators: "#FF0000",
        omnivorous: "#0000FF"
      };
      self.residents.push(new Person(id, type, position, colorHash[type], canvas));
    }
  };

  this.paintAllPersons = function(canvas) {
    self.residents.forEach(function(person){
      person.repaint();
    });
  };

  this.getPopulation = function() {
    return self.residents;
  };
}]);