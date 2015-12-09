"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .controller("TeamProjectController", TeamProjectController);

    function TeamProjectController($scope, TeamProjectService, $rootScope, $location) {
        TeamProjectService.findAllTeamProjectsForUser($rootScope.loggedInUser._id)
            .then(function (projects) {
                $scope.projects = projects;
            });

        $scope.addProject = addProject;
        $scope.updateProject = updateProject;
        $scope.navigate = navigate;
        $scope.deleteProject = deleteProject;
        $scope.selectProject = selectProject;

        function addProject() {
            var teamproject = {
                title: $scope.projectName
                //members: [$rootScope.loggedInUser._id]
            };

            //console.log(angular.isUndefined($scope.projectName));
            if(!angular.isUndefined($scope.projectName) && $scope.projectName != ""){
                TeamProjectService.createTeamProjectForUser($rootScope.loggedInUser._id, teamproject)
                    .then(function(createdTeamProject) {
                        TeamProjectService.findAllTeamProjectsForUser($rootScope.loggedInUser._id)
                            .then(function(teamprojects) {
                                $scope.teamprojects = teamprojects;
                                $scope.projectName = "";
                            });
                    });
            }
        }

        function updateProject() {

        }

        function navigate() {

        }

        function deleteProject() {

        }

        function selectProject() {

        }

    }
})();