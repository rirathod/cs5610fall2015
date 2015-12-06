/**
 * Created by riddhirathod on 12/1/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("ProjectSubTaskService", ProjectSubTaskService);

    function ProjectSubTaskService($q, $http) {

        var service = {
            createSubTaskForProject: createSubTaskForProject,
            deleteSubTaskForProject: deleteSubTaskForProject,

            findAllSubTasksForProject: findAllSubTasksForProject,
            updateSubTaskById: updateSubTaskById
        };
        return service;

        function createSubTaskForProject(projectId, subTask) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectSubTask";
            //console.log(url);
            $http.post(url, subTask)
                .success(function(updatedProject) {
                    defer.resolve(updatedProject);
                });
            return defer.promise;
        }

        function deleteSubTaskForProject(projectId, subTaskId) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectSubTask/" + subTaskId;
            console.log(url);
            $http.delete(url)
                .success(function(updatedProject){
                    console.log(updatedProject);
                    defer.resolve(updatedProject);
                });
            return defer.promise;
        }

        function findAllSubTasksForProject() {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectSubTasks";
            $http.get(url)
                .success(function(projectSubTasks){
                    console.log(projectSubTasks);
                    defer.resolve(projectSubTasks);
                });
            return defer.promise;
        }

        function updateSubTaskById(projectId, selectedSubTaskId, newSubTask) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectSubTask/" + selectedSubTaskId;
            console.log(url);
            console.log(newSubTask);
            $http.put(url, newSubTask)
                .success(function(response){
                    console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();