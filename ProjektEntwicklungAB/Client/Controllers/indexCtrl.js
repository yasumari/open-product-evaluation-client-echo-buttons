angular.module('controllerAsExample', [])
  .controller('SettingsController1', SettingsController1).factory('UserService', UserService);

function SettingsController1($scope, UserService) {
  $scope.users = UserService.all();
    console.log($scope.users);
};


function UserService() {
  var users = ["Peter", "Daniel", "Nina"];

  return {
    all: function() {
      return users;
    },
    first: function() {
      return users[0];
    }
  };
};



//funktioniert
/*angular.module('controllerAsExample', [])
  .controller('SettingsController1', SettingsController1);

function SettingsController1($scope, $http) {
    console.log("controller aufgerufen")
    $http.get('http://localhost:3000/project').
        then(function(response) {
            console.log(response.data.title);
            $scope.greeting = response.data;
        });
}*/
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