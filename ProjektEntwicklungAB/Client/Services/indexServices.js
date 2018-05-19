var myApp = angular.module('myApp', ['ngRoute']);
myApp.factory('dataService', ['$http', function ($http) {

    var getProject = function () {
        return $http.get("http://127.0.0.1:3000/project");
    }
    return {
        getProject: getProject
    }
}]);