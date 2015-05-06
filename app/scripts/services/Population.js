'use strict';

angular.module('lifeGame')
.service('Population', ['Person', 'MAX_POPULATION_NUMBER', 'FIELD_WIDTH','FIELD_HEIGHT','PERIOD_TIME','CICLE_LENGTH_IN_MILISECONDS',function(Person, MAX_POPULATION_NUMBER, FIELD_WIDTH, FIELD_HEIGHT,PERIOD_TIME,CICLE_LENGTH_IN_MILISECONDS){
  var self = this;

  this.create = function(populationConfig, canvas) {
    this.number = populationConfig.populationNumber;
    this.predatorsProcent = populationConfig.predators.procentOfPopulationNumber;
    this.herbivoresProcent = populationConfig.herbivores.procentOfPopulationNumber;
    this.residents = [];

    var numberOfPredators = (this.predatorsProcent / 100) * this.number;
    var numberOfHerbivores = (this.herbivoresProcent / 100) * this.number;
    var numberOfOmnivorous = this.number - numberOfHerbivores - numberOfPredators;
    var predatorsCounter = 0;
    var herbivoresCounter = 0;
    var type = "";
    var color = "";
    var config = null;
    var size = 0;
    var reviewRadius = "";
    var liveTime = "";
    var childrenPerOnePeriod = "";
    var helthPoints = "";
    var damage = "";
    var stamina = ""; 
    var foodNeedForPeriod = "";
    var speed = 0;

    this.populationStart = new Date();

    for (var i = 0; i < this.number; i++) {
      var id = Math.floor(Math.random() * MAX_POPULATION_NUMBER) + "_" + i;
      
      if (predatorsCounter <= numberOfPredators) {
        type = "predators";
        predatorsCounter++;
        color = populationConfig.predators.color;
        size = populationConfig.predators.size;
        reviewRadius = populationConfig.predators.reviewRadius;
        liveTime     = populationConfig.predators.liveTime;
        childrenPerOnePeriod = populationConfig.predators.childrenPerOnePeriod;
        helthPoints = populationConfig.predators.helthPoints;
        damage = populationConfig.predators.damage;
        stamina = populationConfig.predators.stamina; 
        foodNeedForPeriod = populationConfig.predators.foodNeedForPeriod;
        speed = populationConfig.predators.speed;
      } else if (herbivoresCounter <= numberOfHerbivores) {
        type = "herbivores";
        size = populationConfig.herbivores.size;
        color = populationConfig.herbivores.color;
        reviewRadius = populationConfig.herbivores.reviewRadius;
        liveTime     = populationConfig.herbivores.liveTime;
        childrenPerOnePeriod = populationConfig.herbivores.childrenPerOnePeriod;
        helthPoints = populationConfig.herbivores.helthPoints;
        damage = populationConfig.herbivores.damage;
        stamina = populationConfig.herbivores.stamina; 
        foodNeedForPeriod = populationConfig.herbivores.foodNeedForPeriod;
        speed = populationConfig.herbivores.speed;
        herbivoresCounter++;
      } else {
        color = populationConfig.omnivorous.color;
        size = populationConfig.omnivorous.size;
        reviewRadius = populationConfig.omnivorous.reviewRadius;
        liveTime     = populationConfig.omnivorous.liveTime;
        childrenPerOnePeriod = populationConfig.omnivorous.childrenPerOnePeriod;
        helthPoints = populationConfig.omnivorous.helthPoints;
        damage = populationConfig.omnivorous.damage;
        stamina = populationConfig.omnivorous.stamina; 
        foodNeedForPeriod = populationConfig.omnivorous.foodNeedForPeriod;
        speed = populationConfig.omnivorous.speed;
        type = "omnivorous";
      }

      var position = {
        x: Math.floor(Math.random() * FIELD_WIDTH),
        y: Math.floor(Math.random() * FIELD_HEIGHT)
      }

      config = {
        name: id,
        type: type,
        color: color,
        size: size,
        reviewRadius: reviewRadius,
        liveTime: Math.floor(liveTime * Math.random() * 2),
        childrenPerOnePeriod: childrenPerOnePeriod,
        helthPoints: helthPoints,
        damage: damage,
        stamina: stamina,
        foodNeedForPeriod: foodNeedForPeriod,
        speed: speed,
        position: position
      }

      self.residents.push(new Person(config, canvas, this.killPerson));
    }

    setInterval(function(){
      console.log("==========================");
      self.tellPopulationInfo();
      console.log("==========================");
    }, 5000);
  };

  this.tellPopulationInfo = function() {
    console.log("population - ", self.residents.length)
    var predators = self.residents.filter(function(person) {
      return person.type == "predators";
    });
    var herbivores = self.residents.filter(function(person) {
      return person.type == "herbivores";
    });
    var omnivorous = self.residents.filter(function(person) {
      return person.type == "omnivorous";
    });
    this.populationEnd = new Date();
    console.log("predators - ", predators.length);
    console.log("herbivores - ", herbivores.length);
    console.log("omnivorous - ", omnivorous.length);
    console.log("time: ", (this.populationEnd - this.populationStart) / (PERIOD_TIME * CICLE_LENGTH_IN_MILISECONDS) );
  };

  this.paintAllPersons = function(canvas) {
    self.residents.forEach(function(person){
      person.repaint();
    });
  };

  this.killPerson = function(id) {
    self.residents = self.residents.filter(function(person){
      return person.name != id;
    });
  };

  this.getPopulation = function() {
    return self.residents;
  };
}]);