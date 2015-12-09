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

        $scope.addTeamProject = addTeamProject;
        $scope.updateTeamProject = updateTeamProject;
        $scope.navigateToTeamProjectFields = navigateToTeamProjectFields;
        $scope.deleteTeamProject = deleteTeamProject;
        $scope.selectTeamProject = selectTeamProject;

        function addTeamProject() {
            var teamproject = {
                title: $scope.projectName
                //members: [$rootScope.loggedInUser._id]
            };
            console.log(teamproject);

            if(!angular.isUndefined($scope.projectName) && $scope.projectName != ""){
                TeamProjectService.createTeamProjectForUser($rootScope.loggedInUser._id, teamproject)
                    .then(function(createdTeamProject) {
                        console.log(createdTeamProject);
                        TeamProjectService.findAllTeamProjectsForUser($rootScope.loggedInUser._id)
                            .then(function(teamprojects) {
                                $scope.teamprojects = teamprojects;
                                $scope.projectName = "";
                            });
                    });
            }
        }

        function updateTeamProject() {

        }

        function navigateToTeamProjectFields() {

        }

        function deleteTeamProject() {

        }

        function selectTeamProject() {

        }

    }
})();