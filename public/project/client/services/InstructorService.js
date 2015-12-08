/**
 * Created by riddhirathod on 12/1/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("InstructorService", InstructorService);

    function InstructorService($q, $http) {
        var service = {
            addInstructorForProject: addInstructorForProject,
            deleteInstructorForProject: deleteInstructorForProject,
            findAllInstructorsForProject: findAllInstructorsForProject,
            updateInstructorById: updateInstructorById
        };
        return service;

        function addInstructorForProject(projectId, instructor) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/instructor";
            //console.log(url);
            $http.post(url, instructor)
                .success(function(updatedProject) {
                    defer.resolve(updatedProject);
                });
            return defer.promise;
        }

        function deleteInstructorForProject(projectId, instructorId) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/instructor/" + instructorId;
            //console.log(url);
            $http.delete(url)
                .success(function(updatedProject){
                    //console.log(updatedProject);
                    defer.resolve(updatedProject);
                });
            return defer.promise;
        }

        function findAllInstructorsForProject() {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/instructors";
            $http.get(url)
                .success(function(instructors){
                    defer.resolve(instructors);
                });
            return defer.promise;
        }

        function updateInstructorById(projectId, selectedInstructorId, newInstructorObj) {
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/instructor/" + selectedInstructorId;
            $http.put(url, newInstructorObj)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();