/**
 * Created by riddhirathod on 12/6/15.
 */
"use strict";
(function() {
    angular
        .module("HomeworkTrackerApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $rootScope, ProjectService) {
        $scope.$location = $location;
        var userId = $rootScope.user._id;

        $scope.search = search;
        $scope.navigate = navigate;
        function search() {
            var projectTitle = $scope.title;
            ProjectService.findAllProjectsForUser(userId)
                .then(function(projectsForUser) {
                    console.log(projectsForUser);
                    var projects = [];
                    for(var i=0; i<projectsForUser.length; i++) {
                        if(projectsForUser[i].title === projectTitle) {
                            projects.push(projectsForUser[i]);
                        }
                    }
                    $scope.projects = projects;
                });
        }

        function navigate(index){
            var target = "/user/" + userId + "/project/" + $scope.projects[index]._id + "/projectField";
            console.log(target);
            $location.path(target);
        }
    }
})();