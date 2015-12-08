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
        var userId = $rootScope.loggedInUser._id;

        $scope.search = search;
        $scope.navigate = navigate;

        function search() {
            if($rootScope.loggedInUser.userType === "Admin") {
                ProjectService.findAllProjects()
                    .then(function(allProjects) {
                        //console.log("all projects:");
                        //console.log(allProjects);
                        var projects = [];
                        for(var i=0; i<allProjects.length; i++) {
                            var flag = false;
                            if (!angular.isUndefined($scope.id) && $scope.id != "") {
                                if(allProjects[i]._id === $scope.id) {
                                    flag = true;
                                } else {
                                    flag = false;
                                    continue;
                                }
                            }

                            if (!angular.isUndefined($scope.title) && $scope.title != "") {
                                if(allProjects[i].title === $scope.title) {
                                    flag = true;
                                } else {
                                    flag = false;
                                    continue;
                                }
                            }

                            if (!angular.isUndefined($scope.status) && $scope.status != "") {
                                if($scope.status !== "NO SELECTION") {
                                    console.log("Checking for status match");
                                    if(allProjects[i].status === $scope.status) {
                                        flag = true;
                                    } else {
                                        flag =false;
                                        continue;
                                    }
                                }
                            }

                            if (!angular.isUndefined($scope.descriptionKeywords) && $scope.descriptionKeywords != "") {
                                if (allProjects[i].description.indexOf($scope.descriptionKeywords) > -1) {
                                    flag = true;
                                } else {
                                    flag =false;
                                    continue;
                                }
                            }

                            if(flag) {
                                projects.push(allProjects[i]);
                            }
                        }

                        if(projects.length > 0) {
                            $scope.projects = projects;
                            $scope.message = "";
                        } else {
                            $scope.message = "No projects found for this search";
                        }
                    });
            } else if($rootScope.loggedInUser.userType === "Instructor") {

            } else {
                ProjectService.findAllProjectsForUser(userId)
                    .then(function(projectsForUser) {
                        //console.log("projects for user:");
                        //console.log(projectsForUser);
                        var projects = [];
                        for(var i=0; i<projectsForUser.length; i++) {
                            var flag = false;
                            if (!angular.isUndefined($scope.id) && $scope.id != "") {
                                if(projectsForUser[i]._id === $scope.id) {
                                    flag = true;
                                } else {
                                    flag = false;
                                    continue;
                                }
                            }

                            if (!angular.isUndefined($scope.title) && $scope.title != "") {
                                if(projectsForUser[i].title === $scope.title) {
                                    flag = true;
                                } else {
                                    flag = false;
                                    continue;
                                }
                            }

                            if (!angular.isUndefined($scope.status) && $scope.status != "") {
                                if($scope.status !== "NO SELECTION") {
                                    console.log("Checking for status match");
                                    if(projectsForUser[i].status === $scope.status) {
                                        flag = true;
                                    } else {
                                        flag =false;
                                        continue;
                                    }
                                }
                            }

                            if (!angular.isUndefined($scope.descriptionKeywords) && $scope.descriptionKeywords != "") {
                                if (projectsForUser[i].description.indexOf($scope.descriptionKeywords) > -1) {
                                    flag = true;
                                } else {
                                    flag =false;
                                    continue;
                                }
                            }

                            if(flag) {
                                projects.push(projectsForUser[i]);
                            }
                        }

                        if(projects.length > 0) {
                            $scope.projects = projects;
                            $scope.message = "";
                        } else {
                            $scope.message = "No projects found for this search";
                        }
                    });
            }
        }

        function navigate(index){
            var target = "/user/" + userId + "/project/" + $scope.projects[index]._id + "/projectField";
            console.log(target);
            $location.path(target);
        }
    }
})();