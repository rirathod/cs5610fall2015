"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("ProjectService", ProjectService);

    function ProjectService($q,$http) {
        var service = {
            createProjectForUser: createProjectForUser,
            findAllProjects: findAllProjects,
            findAllProjectsForUser: findAllProjectsForUser,
            findProjectById: findProjectById,
            findProjectByTitle: findProjectByTitle,
            deleteProjectById: deleteProjectById,
            updateProjectById: updateProjectById
        };
        return service;

        function createProjectForUser(userId, project) {
            var defer = $q.defer();
            var url = "/api/project/user/" + userId + "/project";
            $http.post(url, project)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllProjects() {
            var defer = $q.defer();
            var url = "/api/project/project";
            //console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllProjectsForUser(userId) {
            var defer = $q.defer();
            var url = "/api/project/user/" + userId + "/project";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findProjectById(projectId) {
            var defer = $q.defer();
            var url = "/api/project/project/"+ projectId;
            //console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findProjectByTitle(title) {
            var defer = $q.defer();
            var url = "/api/project/project?projectTitle="+ title;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteProjectById(projectId) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId;
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateProjectById(projectId, newProject) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId;
            $http.put(url, newProject)
                .success(function(updatedProject){
                    defer.resolve(updatedProject);
                });
            return defer.promise;
        }
    }
})();