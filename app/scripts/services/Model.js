'use strict';

angular.module('lifeGame')
.factory('Model', ['$http', '$q', function($http, $q) {
    var Model = {
        loadConfig: function() {
            var deferred = $q.defer();
            var scope = this;
            $http.get('data/config.json')
                .success(function(model) {
                    deferred.resolve(model);
                })
                .error(function() {
                    deferred.reject();
                });
            return deferred.promise;
        }
    };
    return Model;
}]);