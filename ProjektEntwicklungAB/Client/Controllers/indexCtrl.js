var app = angular.module('controllerAsExample', ['ngResource']);
app.factory('Person', ['$resource', function ($resource) {
    return {
        getAll: function(){
            return $resource("http://localhost:3000/project")
        }
    }
}]);

app.controller('SettingsController1', ['$scope', 'Person', function($scope, Person) {
 Person.getAll().get().$promise.then(function(result) {
    //success
    $scope.bloglist = result.description;
    console.log($scope.bloglist);
  }, function(errResponse) {
    // fail
  });
}]);   
