/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .controller("ProjectFieldController", ProjectFieldController);

    function ProjectFieldController($scope, ProjectService, ProjectFieldService, $rootScope, $location, $routeParams) {
        var userId = $routeParams.userId;
        var projectId = $routeParams.projectId;

        //console.log(userId);
        //console.log(projectId);

        ProjectService.findProjectById(projectId)
            .then(function(project){
                console.log(project);

                var project =  {
                    "_id": project._id,
                    "title": project.title,
                    "description": project.description,
                    "status": project.status,
                    "githubUsername": project.githubUsername,
                    "githubReponame": project.githubReponame
                    //"subTasks": project.projectSubTasks,
                    //"githubCommits": project.projectGithubCommits
                };

                $scope.project = project;
                console.log(project);
            });

        $scope.updateProject = updateProject;

        $scope.addProjectSubTask = addProjectSubTask;
        $scope.getProjectSubTasks = getProjectSubTasks;
        $scope.updateProjectSubTask = updateProjectSubTask;
        $scope.removeProjectSubTask = removeProjectSubTask;

        function updateProject() {
            var project = {
                "description": $scope.project.description,
                "status": $scope.project.status,
                "githubUsername": $scope.project.githubUsername,
                "githubReponame": $scope.project.githubReponame
            };

            ProjectService.updateProjectById(projectId, project)
                .then(function(updatedProject) {
                    console.log(updatedProject);
                    $scope.project = updatedProject;
                });
        }

        function addProjectSubTask() {

        }

        function getProjectSubTasks() {

        }

        function updateProjectSubTask() {

        }

        function removeProjectSubTask() {

        }
    }
})();