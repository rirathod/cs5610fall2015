/**
 * Created by riddhirathod on 12/1/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("ProjectFieldService", ProjectFieldService);

    function ProjectFieldService($q, $http) {

        var service = {
            createFieldForProject: createFieldForProject,
            getFieldsForProject: getFieldsForProject,
            getFieldForProject: getFieldForProject,
            deleteFieldFromProject: deleteFieldFromProject,
            updateProjectField: updateProjectField,
            cloneProjectField : cloneProjectField
        };
        return service;

        function createFieldForProject(projectId, projectField){
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectField";
            console.log(url);
            $http.post(url, projectField)
                .success(function(updatedProject){
                    defer.resolve(updatedProject.projectFields);
                });
            return defer.promise;
        }

        function getFieldsForProject(projectId){
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectField";
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function getFieldForProject(projectId, projectFieldId){
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectField/" + projectFieldId;
            $http.get(url)
                .success(function(projectField){
                    defer.resolve(projectField);
                });
            return defer.promise;
        }

        function deleteFieldFromProject(projectId, projectFieldId){
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectField/" + projectFieldId;
            $http.delete(url)
                .success(function(updatedProject){
                    defer.resolve(updatedProject.projectFields);
                });
            return defer.promise;
        }

        function updateProjectField(projectId, projectFieldId, projectField){
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectField/" + projectFieldId;
            $http.put(url, projectField)
                .success(function(updatedProject){
                    defer.resolve(updatedProject.projectFields);
                });
            return defer.promise;
        }

        function cloneProjectField(projectId, projectField){
            var defer = $q.defer();
            var url = "/api/project/project/" + projectId + "/projectField";
            $http.post(url, projectField)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();