'use strict';

angular.module('bookViewer')
.directive('booksList', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/books.html'
    };
});