/**
 * Created by riddhirathod on 12/9/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("ProjectCommentService", ProjectCommentService);

    function ProjectCommentService($q, $http) {
        var service = {
            addCommentForProject: addCommentForProject,
            deleteCommentForProject: deleteCommentForProject,
            findAllCommentsForProject: findAllCommentsForProject
        };
        return service;

        function addCommentForProject(projectId, comment) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectComment";
            $http.post(url, comment)
                .success(function(updatedProject) {
                    defer.resolve(updatedProject);
                });
            return defer.promise;
        }

        function deleteCommentForProject(projectId, commentId) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectComment/" + commentId;
            //console.log(url);
            $http.delete(url)
                .success(function(updatedProject){
                    //console.log(updatedProject);
                    defer.resolve(updatedProject);
                });
            return defer.promise;
        }

        function findAllCommentsForProject(projectId) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectComments";
            $http.get(url)
                .success(function(projectComments){
                    defer.resolve(projectComments);
                });
            return defer.promise;
        }
    }
})();