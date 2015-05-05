'use strict';

angular.module('lifeGame')
.constant('ROUTES', {
  root: {
    main: {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }
  }
})
.config(['$routeProvider', '$locationProvider', 'ROUTES', function($routeProvider, $locationProvider, ROUTES) {
  var createRoute = function(routeObj) {
    if(routeObj.url){
      $routeProvider.when(routeObj.url, routeObj);
    } else {
      angular.forEach(routeObj, createRoute);
    }
    $routeProvider.otherwise({redirectTo: '/books'});
  };
  angular.forEach(ROUTES, createRoute);
}])
.run(['$rootScope', 'ROUTES', function($rootScope, ROUTES) {
  $rootScope.ROUTES = ROUTES;
}]);
