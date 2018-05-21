var myapp=angular.module('serviceProjects', ['ngResource']);
myapp.factory('ProjectsFactory', ['$resource',function ($resource) {
    return $resource('http://localhost:3000/projects/:id', {}, {
        getAll: {method:'GET', params:{id:''}, isArray:true},
        getOne: { method: 'GET', params:{id:'@id'}, isArray:false },
        update: { method: 'PUT', params: {id: '@id'} },
        post: { method: 'POST', params: {id: ''} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);