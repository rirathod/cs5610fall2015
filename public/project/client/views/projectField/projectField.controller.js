/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .controller("ProjectFieldController", ProjectFieldController);

    function ProjectFieldController($scope, GithubService, ProjectService, $rootScope, $location, $routeParams) {
        var userId = $routeParams.userId;
        var projectId = $routeParams.projectId;

        ProjectService.findProjectById(projectId)
            .then(function(project){
                //console.log(project);

                //var project =  {
                //    "_id": project._id,
                //    "title": project.title,
                //    "description": project.description,
                //    "status": project.status,
                //    "githubUsername": project.githubUsername,
                //    "githubReponame": project.githubReponame
                //};

                $scope.project = project;
                //console.log(project);
            });

        $scope.updateProject = updateProject;

        $scope.addProjectSubTask = addProjectSubTask;
        $scope.updateProjectSubTask = updateProjectSubTask;
        $scope.deleteProjectSubTask = deleteProjectSubTask;
        $scope.selectProjectSubTask = selectProjectSubTask;

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

                    console.log("Before syncing git commits");
                    GithubService.syncCommits($scope.project.githubUsername, $scope.project.githubReponame)
                        .then(function(commits) {
                            console.log(commits);

                            var projectCommits = [];
                            for(var i=0; i<commits.length; i++) {
                                projectCommits.push({
                                    "committer": commits[i].commit.committer.name,
                                    "message": commits[i].commit.message,
                                    "timestamp": commits[i].commit.committer.date
                                });
                            }

                            var newProject = {
                                "commits": projectCommits
                            };
                            console.log(newProject);

                            ProjectService.updateProjectById(projectId, newProject)
                                .then(function(updatedProject) {
                                    console.log(updatedProject);
                                    $scope.project = updatedProject;
                                });
                        });
                    console.log("After syncing git commits");

                });
        }

        function addProjectSubTask() {
            if(!angular.isUndefined($scope.subTaskName) && $scope.subTaskName != ""){
                console.log($scope.subTaskName);

                var subTask = {
                    "name": $scope.subTaskName
                };

                ProjectService.createSubTaskForProject(projectId, subTask)
                    .then(function(updatedProject) {
                        $scope.project = updatedProject;
                        $scope.subTaskName = "";
                    });
            }
        }

        function getProjectSubTasks() {

        }

        function updateProjectSubTask() {

        }

        function deleteProjectSubTask() {

        }

        function selectProjectSubTask() {

        }
    }
})();