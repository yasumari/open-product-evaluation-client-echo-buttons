var myapp=angular.module('controllerProjects', ['ngResource', 'serviceProjects']);
//'$routeParams für aktuelle Route der Seite (IDs erhalten)
myapp.controller('ProjectController', ProjectsController);

ProjectsController.$inject=['$scope', 'ProjectsFactory'];

function ProjectsController($scope, ProjectsFactory) {
    
    //GET ONE
    ProjectsFactory.getOne({id: 1}).$promise.then(function(result) {
    //success
     $scope.name=result.title;
    $scope.description = result.description;
    console.log($scope.name + ": " + $scope.description);
  }, function(errResponse) {
    // fail
  });
    
    //GET ALL
    ProjectsFactory.getAll().$promise.then(function(result) {
    //success
     $scope.name=result.title;
    $scope.description = result.description;
    console.log("ALLE PROJEKTE: ");
        result.forEach(function(projekt){
            console.log(projekt.description);
        });
  }, function(errResponse) {
    // fail
  });
    
    //DELETE
    ProjectsFactory.delete({id: 1}).$promise.then(function(result) {
    //success
    console.log("DELETE: " + result.message);
  }, function(errResponse) {
    // fail
  });
        //UPDATE
    ProjectsFactory.update({id: 1}, {name: 'TESTput', description: 'testmailput'}).$promise.then(function(result) {
    //success
    console.log("UPDATE: " + result.message);
  }, function(errResponse) {
    // fail
  });
    
    ProjectsFactory.post({},{name: 'testpost', description: 'testmailpost'}).$promise.then(function(result) {
    //success
    console.log("POST: " + result.message);
  }, function(errResponse) {
    // fail
  });
    
}


