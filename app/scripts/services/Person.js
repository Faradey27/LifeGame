'use strict';

angular.module('lifeGame')
.factory('Person', ['$interval','PERIOD_TIME','CICLE_LENGTH_IN_MILISECONDS', function($interval, CICLE_LENGTH_IN_MILISECONDS, PERIOD_TIME){

  var Person = function (config, canvas, dieCallback) {
      this.name = config.name;
      this.type = config.type;
      this.color = config.color;
      this.size = config.size;
      this.speed = config.speed;
      this.reviewRadius = config.reviewRadius;
      this.liveTime = config.liveTime;
      this.childrenPerOnePeriod = config.childrenPerOnePeriod;
      this.helthPoints = config.helthPoints;
      this.damage = config.damage;
      this.stamina = config.stamina;
      this.foodNeedForPeriod = config.foodNeedForPeriod;
      this.position = {
        x: config.position.x,
        y: config.position.y
      };
      this.canvas = canvas;
      this.circleCounter = 0;
      this.periodCounter = 0;
      this.dieCallback = dieCallback;
      this.createPersinLife();
      return this;
  };

  Person.prototype = {
    createPersinLife: function() {
      var self = this;

      self.lifeTimer = $interval(function(){
        self.prepareToMove();
        self.move();
        self.repaint();
        self.circleCounter++;
        if (self.circleCounter >= PERIOD_TIME) {
          self.circleCounter = 0;
          self.periodCounter++;
          self.decreaseFood();
        }
        if (self.periodCounter >= self.liveTime) {
          self.die();
        }
      }, CICLE_LENGTH_IN_MILISECONDS);
    },

    decreaseFood: function() {
      this.foodNeedForPeriod--;
      if (this.foodNeedForPeriod < 0) {
        this.die();
      }
    },

    die: function() {
      $interval.cancel(self.lifeTimer);
      this.prepareToMove();
      this.dieCallback(this.name);
    },



    prepareToMove: function(person) {
      var x = this.position.x;
      var y = this.position.y;
      var size = this.size;
      this.canvas.clearRect(x,y,size,size);
    },

    move: function() {
      var signX = Math.random() >= 0.5 ? 1 : -1;
      var signY = Math.random() >= 0.5 ? 1 : -1;
      this.position.x += signX * Math.floor(Math.random() * this.speed);
      this.position.y += signY * Math.floor(Math.random() * this.speed);
      if (this.position.x >= 800) {
        this.position.x = 800
      } else if (this.position.x <= 0) {
        this.position.x = 0;
      }

      if (this.position.y >= 600) {
        this.position.y = 600
      } else if (this.position.y <= 0) {
        this.position.y = 0;
      }
    },

    repaint: function() {
      var color = this.color;
      var x     = this.position.x;
      var y     = this.position.y;
      var size  = this.size;
      this.canvas.fillStyle = color;
      this.canvas.beginPath();
      this.canvas.rect(x,y,size,size);
      this.canvas.closePath();
      this.canvas.fill();
    }
  };

  return Person;
}]);