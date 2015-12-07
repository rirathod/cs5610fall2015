/**
 * Created by riddhirathod on 12/1/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .controller("IndividualProjectController", IndividualProjectController);

    function IndividualProjectController($scope, ProjectService, $rootScope, $location) {
        ProjectService.findAllProjectsForUser($rootScope.loggedInUser._id)
            .then(function(projects) {
                $scope.projects = projects;
            });

        $scope.addProject = addProject;
        $scope.deleteProject = deleteProject;
        $scope.selectProject = selectProject;
        $scope.updateProject = updateProject;
        $scope.navigate = navigate;

        function addProject() {
            var project = {
                title: $scope.projectName
            };

            //console.log(angular.isUndefined($scope.projectName));
            if(!angular.isUndefined($scope.projectName) && $scope.projectName != ""){
                ProjectService.createProjectForUser($rootScope.loggedInUser._id, project)
                    .then(function(createdProject) {
                        ProjectService.findAllProjectsForUser($rootScope.loggedInUser._id)
                            .then(function(projects) {
                                $scope.projects = projects;
                                $scope.projectName = "";
                            });
                    });
            }
        }

        function deleteProject(projectId) {
            ProjectService.deleteProjectById(projectId)
                .then(function(projects) {
                    ProjectService.findAllProjectsForUser($rootScope.loggedInUser._id)
                        .then(function (projects) {
                            $scope.projects = projects;
                        });
                });
        }

        function selectProject(index) {
            $scope.selectedProjectId = $scope.projects[index]._id;
            $scope.projectName = $scope.projects[index].title;
            $scope.index = index;
        }

        function updateProject(selectedProjectId, index) {
            if (!angular.isUndefined(index)) {
                if (!angular.isUndefined($scope.projectName) && $scope.projectName != "") {
                    var newProject = {
                        title: $scope.projectName,
                        userId: $rootScope.loggedInUser._id
                    };
                    ProjectService.updateProjectById(selectedProjectId, newProject).then(function(updatedProject) {
                        $scope.projects[index] = updatedProject;
                        $scope.projectName = "";
                    })
                }
            }
        }

        function navigate(index){
            var target = "/user/" + $rootScope.loggedInUser._id + "/project/" + $scope.projects[index]._id + "/projectField";
            console.log(target);
            $location.path(target);
        }
    }
})();