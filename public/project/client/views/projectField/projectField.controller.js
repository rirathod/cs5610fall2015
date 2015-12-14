/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .controller("ProjectFieldController", ProjectFieldController);

    function ProjectFieldController($scope, $location, $rootScope, $routeParams,
                                    GithubService, ProjectService,
                                    ProjectSubTaskService, InstructorService, ProjectCommentService) {
        var userId = $routeParams.userId;
        var projectId = $routeParams.projectId;

        function updateProjectStatus(project) {
            if (project.commits.length === 0){
                console.log("Updating project status to NOT STARTED because commits are 0");
                var newProject1 = {
                    "status": "NOT STARTED"
                };

                ProjectService.updateProjectById(projectId, newProject1)
                    .then(function(updatedProject) {
                        ProjectService.findProjectById(projectId)
                            .then(function(updatedProject) {
                                $scope.project = updatedProject;
                                $scope.subTasks = updatedProject.subTasks;
                                $scope.instructors = updatedProject.instructors;
                                $scope.comments = updatedProject.comments;
                            });
                    });
            } else if((project.commits.length > 0) && (project.status === "NOT STARTED")){
                console.log("Updating project status from NOT STARTED to STARTED");
                var newProject2 = {
                    "status": "STARTED"
                };

                ProjectService.updateProjectById(projectId, newProject2)
                    .then(function(updatedProject) {
                        ProjectService.findProjectById(projectId)
                            .then(function(updatedProject) {
                                $scope.project = updatedProject;
                                $scope.subTasks = updatedProject.subTasks;
                                $scope.instructors = updatedProject.instructors;
                                $scope.comments = updatedProject.comments;
                            });
                    });
            } else if (project.commits.length > 0) {
                var flag = false;
                var commits  = project.commits;
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

                var newProject3 = {
                    "status": ""
                };
                if (flag) {
                    newProject3.status = "COMPLETED";
                } else {
                    newProject3.status = "STARTED";
                }

                //console.log(newProject3);
                ProjectService.updateProjectById(projectId, newProject3)
                    .then(function(updatedProject) {
                        ProjectService.findProjectById(projectId)
                            .then(function(updatedProject) {
                                $scope.project = updatedProject;
                                $scope.subTasks = updatedProject.subTasks;
                                $scope.instructors = updatedProject.instructors;
                                $scope.comments = updatedProject.comments;
                            });
                    });
            }
        }

        function syncGitCommits(project) {
            if (!angular.isUndefined(project.githubUsername) && project.githubUsername != ""
                && !angular.isUndefined(project.githubReponame) && project.githubReponame != "") {

                // Syncing git commits for project
                GithubService.syncCommits(project.githubUsername, project.githubReponame)
                    .then(function(commits) {
                        //console.log(commits);
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
                                // Updating project status based on git commit messages
                                updateProjectStatus(updatedProject);
                            });
                    });
            } else {
                var newProject = {
                    "status": "NOT STARTED"
                };

                ProjectService.updateProjectById(projectId, newProject)
                    .then(function(updatedProject) {
                        ProjectService.findProjectById(projectId)
                            .then(function(updatedProject) {
                                $scope.project = updatedProject;
                                $scope.subTasks = updatedProject.subTasks;
                                $scope.instructors = updatedProject.instructors;
                                $scope.comments = updatedProject.comments;
                            });
                    });
            }
        }

        function loadProjectFields() {
            ProjectService.findProjectById(projectId)
                .then(function(project){
                    syncGitCommits(project);
                });
        }
        loadProjectFields();

        // Project
        $scope.updateProject = updateProject;

        // Project Sub-Tasks
        $scope.addProjectSubTask = addProjectSubTask;
        $scope.updateProjectSubTask = updateProjectSubTask;
        $scope.deleteProjectSubTask = deleteProjectSubTask;
        $scope.selectProjectSubTask = selectProjectSubTask;

        // Instructor
        $scope.addInstructorEmail = addInstructorEmail;
        $scope.updateInstructorEmail = updateInstructorEmail;
        $scope.deleteInstructorEmail = deleteInstructorEmail;
        $scope.selectInstructorEmail = selectInstructorEmail;

        // Instructor Comments
        $scope.addInstructorComment = addInstructorComment;
        $scope.removeInstructorComment = removeInstructorComment;

        function updateProject() {
            if (!angular.isUndefined($scope.project.description) && $scope.project.description != ""
            && !angular.isUndefined($scope.project.githubUsername) && $scope.project.githubUsername != ""
            && !angular.isUndefined($scope.project.githubReponame) && $scope.project.githubReponame != "") {
                var project = {
                    "description": $scope.project.description,
                    "githubUsername": $scope.project.githubUsername,
                    "githubReponame": $scope.project.githubReponame
                };

                ProjectService.updateProjectById(projectId, project)
                    .then(function(updatedProject) {
                        loadProjectFields();
                    });
                $scope.error="";
            } else {
                $scope.error="One or more input fields are missing";
            }
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
                    //console.log(updatedProject);
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
                    ProjectSubTaskService.updateSubTaskById(projectId, selectedSubTaskId, newSubTask)
                        .then(function(updatedProject) {
                            //$scope.project = updatedProject;
                            $scope.subTasks = updatedProject.subTasks;
                            $scope.subTaskName = "";
                        })
                }
            }
        }

        function addInstructorEmail() {
            if(!angular.isUndefined($scope.instructorEmail) && $scope.instructorEmail != ""){
                var instructor = {
                    "email": $scope.instructorEmail
                };

                InstructorService.addInstructorForProject(projectId, instructor)
                    .then(function(updatedProject) {
                        //console.log(updatedProject);
                        $scope.instructors = updatedProject.instructors;
                        $scope.instructorEmail = "";
                    });
            }
        }

        function deleteInstructorEmail(instructorId) {
            InstructorService.deleteInstructorForProject(projectId, instructorId)
                .then(function(updatedProject) {
                    //console.log(updatedProject);
                    $scope.instructors = updatedProject.instructors;
                });
        }

        function selectInstructorEmail(index) {
            $scope.selectedInstructorEmailId = $scope.instructors[index]._id;
            $scope.instructorEmail = $scope.instructors[index].email;
            $scope.emailIndex = index;
        }

        function updateInstructorEmail(selectedInstructorEmailId, index) {
            if (!angular.isUndefined(index)) {
                if (!angular.isUndefined($scope.instructorEmail) && $scope.instructorEmail != "") {
                    var newInstructor = {
                        email: $scope.instructorEmail
                    };
                    InstructorService.updateInstructorById(projectId, selectedInstructorEmailId, newInstructor)
                        .then(function(updatedProject) {
                            //$scope.project = updatedProject;
                            $scope.instructors = updatedProject.instructors;
                            $scope.instructorEmail = "";
                        })
                }
            }
        }

        function addInstructorComment() {
            //console.log($scope.instructorComment);
            if ($rootScope.loggedInUser.userType === "Instructor") {
                if(!angular.isUndefined($scope.instructorComment) && $scope.instructorComment != ""){
                    var comment = {
                        "comment": $scope.instructorComment,
                        "instructor": $rootScope.loggedInUser.email
                    };

                    ProjectCommentService.addCommentForProject(projectId, comment)
                        .then(function(updatedProject) {
                            //console.log(updatedProject);
                            $scope.comments = updatedProject.comments;
                            $scope.instructorComment = "";
                        });
                }
            } else {
                $scope.instructorComment = "";
                $scope.error2 = "User not authorized to post comment."
            }
        }

        function removeInstructorComment(instructorEmail, commentId) {
            if(instructorEmail === $rootScope.loggedInUser.email) {
                //console.log("Instructor same as the one who posted this comment");
                ProjectCommentService.deleteCommentForProject(projectId, commentId)
                    .then(function(updatedProject) {
                        //console.log(updatedProject);
                        $scope.comments = updatedProject.comments;
                    });
                $scope.error2="";
            } else {
                //console.log("Instructor different as the one who posted this comment...you are an evil instructor");
                $scope.error2 = "User not authorized to post comment."
            }
        }
    }
})();