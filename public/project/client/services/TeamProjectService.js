/**
 * Created by riddhirathod on 12/8/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("TeamProjectService", TeamProjectService);

    function TeamProjectService($q,$http) {
        var service = {
            createTeamProjectForUser: createTeamProjectForUser,
            findAllTeamProjectsForUser: findAllTeamProjectsForUser,
            findTeamProjectById: findTeamProjectById,
            findTeamProjectByTitle: findTeamProjectByTitle,
            deleteTeamProjectById: deleteTeamProjectById,
            updateTeamProjectById: updateTeamProjectById
        };
        return service;

        function createTeamProjectForUser(userId, project) {
            var defer = $q.defer();
            var url = "/api/project/user/" + userId + "/teamproject";
            $http.post(url, project)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllTeamProjectsForUser(userId) {
            var defer = $q.defer();
            return defer.promise;
        }

        function findTeamProjectById() {
            var defer = $q.defer();
            return defer.promise;
        }

        function findTeamProjectByTitle() {
            var defer = $q.defer();
            return defer.promise;
        }

        function deleteTeamProjectById() {
            var defer = $q.defer();
            return defer.promise;
        }

        function updateTeamProjectById() {
            var defer = $q.defer();
            return defer.promise;
        }
    }

})();