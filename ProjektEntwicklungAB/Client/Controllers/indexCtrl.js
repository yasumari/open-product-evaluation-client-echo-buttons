angular.module('controllerAsExample', [])
  .controller('SettingsController1', SettingsController1);

function SettingsController1($scope, $http) {
    $http.get('http://localhost:3000/project').
        then(function(response) {
            console.log(response.data.title);
            $scope.greeting = response.data;
        });
}
/*appIndex.controller('indexController', ['$scope', 'DataService', function ($scope, DataService) {
    $scope.listProject = "";
    //load all available Projects from server.
    loadProjects();
    function loadProjects()
    {
        DataService.getProject().then(function successCallback(response) {
            if (response.data.length > 0) {
                $scope.listProject = response.data;
            } 
        }, function errorCallback(response) {
            //alert(response.status);
        });
    }
}]);*/