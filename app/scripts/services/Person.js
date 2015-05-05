'use strict';

angular.module('lifeGame')
.factory('Person', function(){
  var Person = function (name, type, position, color, canvas) {
      this.name = name;
      this.type = type;
      this.color = color;
      this.position = {
        x: position.x,
        y: position.y
      };
      this.size = 5;
      this.canvas = canvas;
      this.createPersinLife();
      return this;
  };

  Person.prototype = {
    createPersinLife: function() {
      var self = this;
      setInterval(function(){
        self.prepareToMove();
        self.move();
        self.repaint();
      },200);
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
      this.position.x += signX * Math.floor(Math.random() * this.size*2);
      this.position.y += signY * Math.floor(Math.random() * this.size*2);
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
});