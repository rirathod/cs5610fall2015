/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .controller("ProjectFieldController", ProjectFieldController);

    function ProjectFieldController($scope, GithubService, ProjectService, ProjectSubTaskService, $location, $routeParams) {
        var userId = $routeParams.userId;
        var projectId = $routeParams.projectId;

        function updateProjectStatus() {
            if(($scope.project.commits.length > 0) && ($scope.project.status === "NOT STARTED")){
                console.log("Updating project status from NOT STARTED to STARTED");
                var newProject = {
                    "status": "STARTED"
                };

                ProjectService.updateProjectById(projectId, newProject)
                    .then(function(updatedProject) {
                        //console.log(updatedProject);
                        $scope.project = updatedProject;
                    });
            } else if(($scope.project.commits.length > 0) && ($scope.project.status === "STARTED")) {
                var flag = false;
                var commits  = $scope.project.commits;
                for(var i=0; i<commits.length; i++) {
                    if(commits[i].message.indexOf("finish") > -1
                        || commits[i].message.indexOf("Finish") > -1
                        || commits[i].message.indexOf("FINISH") > -1
                        || commits[i].message.indexOf("complete") > -1
                        || commits[i].message.indexOf("Complete") > -1
                        || commits[i].message.indexOf("COMPLETE") > -1) {
                        var flag = true;
                        break;
                    }
                }

                if (flag) {
                    var newProject = {
                        "status": "COMPLETED"
                    };
                    ProjectService.updateProjectById(projectId, newProject)
                        .then(function(updatedProject) {
                            //console.log(updatedProject);
                            $scope.project = updatedProject;
                        });
                }
            }
        }

        function syncGitCommits() {
            if (!angular.isUndefined($scope.project.githubUsername) && $scope.project.githubUsername != ""
                && !angular.isUndefined($scope.project.githubReponame) && $scope.project.githubReponame != "") {

                // Syncing git commits for project
                GithubService.syncCommits($scope.project.githubUsername, $scope.project.githubReponame)
                    .then(function(commits) {
                        console.log(commits);
                        var projectCommits = [];
                        for (var i = 0; i < commits.length; i++) {
                            projectCommits.push({
                                "committer": commits[i].commit.committer.name,
                                "committerHtmlUrl": commits[i].committer.html_url,
                                "message": commits[i].commit.message,
                                "commitHtmlUrl": commits[i].html_url,
                                "timestamp": commits[i].commit.committer.date
                            });
                        }
                        var newProject = {
                            "commits": projectCommits
                        };

                        // Load project git commits
                        ProjectService.updateProjectById(projectId, newProject)
                            .then(function (updatedProject) {
                                //console.log(updatedProject);
                                $scope.project = updatedProject;

                                // Updating project status based on git commit messages
                                //console.log($scope.project.commits.length);
                                //console.log($scope.project.status);
                                updateProjectStatus();
                            });
                    });
            }
        }

        ProjectService.findProjectById(projectId)
            .then(function(project){
                $scope.project = project;
                $scope.subTasks = project.subTasks;
                console.log("Before syncing git commits");
                syncGitCommits();
                console.log("After syncing git commits");
            });

        // Project
        $scope.updateProject = updateProject;
        $scope.navigateToGitUserPage = navigateToGitUserPage;
        $scope.navigateToGitCommitPage = navigateToGitCommitPage;

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
                    //console.log(updatedProject);
                    $scope.project = updatedProject;
                    syncGitCommits();
                });
        }

        function navigateToGitUserPage(index) {
            var commits = $scope.project.commits;
            var target = commits[index].committerHtmlUrl;
            console.log(target);
            $location.path(target);
        }

        function navigateToGitCommitPage(index) {
            var commits = $scope.project.commits;
            var target = commits[index].commitHtmlUrl;
            console.log(target);
            $location.path(target);
        }

        function addProjectSubTask() {
            if(!angular.isUndefined($scope.subTaskName) && $scope.subTaskName != ""){
                var subTask = {
                    "name": $scope.subTaskName
                };

                ProjectSubTaskService.createSubTaskForProject(projectId, subTask)
                    .then(function(updatedProject) {
                        $scope.subTasks = updatedProject.subTasks;
                        $scope.subTaskName = "";
                    });
            }
        }

        function deleteProjectSubTask(subTaskId) {
            ProjectSubTaskService.deleteSubTaskForProject(projectId, subTaskId)
                .then(function(updatedProject) {
                    console.log(updatedProject);
                    $scope.subTasks = updatedProject.subTasks;
                });
        }

        function selectProjectSubTask(index) {
            $scope.selectedSubTaskId = $scope.subTasks[index]._id;
            $scope.subTaskName = $scope.subTasks[index].name;
            $scope.index = index;
        }

        function updateProjectSubTask(selectedSubTaskId, index) {
            if (!angular.isUndefined(index)) {
                if (!angular.isUndefined($scope.subTaskName) && $scope.subTaskName != "") {
                    var newSubTask = {
                        name: $scope.subTaskName
                    };
                    ProjectSubTaskService.updateSubTaskById(projectId, selectedSubTaskId, newSubTask).then(function(updatedProject) {
                        //$scope.project = updatedProject;
                        $scope.subTasks = updatedProject.subTasks;
                        $scope.subTaskName = "";
                    })
                }
            }
        }
    }
})();