angular.module('controllerAsExample', [])
  .controller('SettingsController1', SettingsController1);

function SettingsController1() {
  this.name = 'John Smith';
  this.contacts = [
    {type: 'phone', value: '408 555 1212'},
    {type: 'email', value: 'john.smith@example.org'}
  ];
}

/*var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);
myApp.controller('myController', ['$scope', 'DataService', function ($scope, myService) {
    $log.info('inside the Dashboardcontroller');
  $scope.myService = myService;
}]);
myApp.factory('myService', function () {
  return {
      myImportantValue: 42
  };
});*/

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