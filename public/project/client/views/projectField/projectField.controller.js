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

        function updateProjectStatus() {
            if(($scope.project.commits.length > 1) && ($scope.project.status === "NOT STARTED")){
                console.log("Updating project status from NOT STARTED to STARTED");
                var newProject = {
                    "status": "STARTED"
                };
                console.log(newProject);

                ProjectService.updateProjectById(projectId, newProject)
                    .then(function(updatedProject) {
                        console.log(updatedProject);
                        $scope.project = updatedProject;
                    });
            }
        }

        function syncGitCommits() {
            if (!angular.isUndefined($scope.project.githubUsername) && $scope.project.githubUsername != ""
                && !angular.isUndefined($scope.project.githubReponame) && $scope.project.githubReponame != "") {

                // Syncing git commits for project
                GithubService.syncCommits($scope.project.githubUsername, $scope.project.githubReponame)
                    .then(function (commits) {
                        console.log(commits);
                        var projectCommits = [];
                        for (var i = 0; i < commits.length; i++) {
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

                        // Load project git commits
                        ProjectService.updateProjectById(projectId, newProject)
                            .then(function (updatedProject) {
                                console.log(updatedProject);
                                $scope.project = updatedProject;

                                // Updating project status based on git commit messages
                                console.log($scope.project.commits.length);
                                console.log($scope.project.status);
                                updateProjectStatus();
                            });
                    });
            }
        }

        ProjectService.findProjectById(projectId)
            .then(function(project){
                $scope.project = project;
                console.log("Before syncing git commits");
                syncGitCommits();
                console.log("After syncing git commits");
            });

        // Project
        $scope.updateProject = updateProject;
        // Project Sub-Tasks
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

        function updateProjectSubTask() {

        }

        function deleteProjectSubTask() {

        }

        function selectProjectSubTask() {

        }
    }
})();