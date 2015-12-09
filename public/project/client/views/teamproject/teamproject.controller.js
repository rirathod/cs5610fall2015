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


    }
})();