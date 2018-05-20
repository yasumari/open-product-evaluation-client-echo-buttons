angular.module('controllerAsExample', ['ngResource', 'serviceAsExample'])
    .controller('SettingsController1', ContactController);

ContactController.$inject = ['$scope', 'Person'];

function ContactController($scope, Person) {
 Person.getAll().get().$promise.then(function(result) {
    //success
     $scope.name=result.title;
    $scope.description = result.description;
    console.log($scope.name);
  }, function(errResponse) {
    // fail
  });
}