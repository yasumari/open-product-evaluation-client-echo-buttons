angular.module('serviceAsExample', ['ngResource']).factory('Person', ['$resource', function ($resource) {
    return {
        getAll: function(){
            return $resource("http://localhost:3000/project")
        }
    }
}]);