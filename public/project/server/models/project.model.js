/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
var q = require("q");

module.exports = function(mongoose, db){
    var ProjectSchema = require('./project.schema.js')(mongoose);
    var ProjectModel  = mongoose.model("ProjectModel", ProjectSchema);

    var api = {
        Create : Create,
        FindAll : FindAll,
        FindProjectByTitle : FindProjectByTitle,
        FindProjectsByUserId : FindProjectsByUserId,
        FindById : FindById,
        Update : Update,
        Delete : Delete,

        AddSubTask : AddSubTask,
        DeleteSubTask : DeleteSubTask,
        FindProjectSubTasks : FindProjectSubTasks,
        UpdateProjectSubTask : UpdateProjectSubTask,

        AddInstructorToProject : AddInstructorToProject,
        RemoveInstructorFromProject : RemoveInstructorFromProject,
        GetInstructorsForProject : GetInstructorsForProject,
        UpdateInstructorForProject : UpdateInstructorForProject,

        AddComment: AddComment,
        DeleteComment: DeleteComment,
        FindProjectComments: FindProjectComments
    };
    return api;

    // *************** Project api ***************
    function Create(project, userId){
        var deferred = q.defer();
        project.userId = userId;
        ProjectModel.create(project, function(err, createdProject) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(createdProject);
            }
        });
        return deferred.promise;
    }

    function FindAll(){
        //console.log("In project.model.js: FindAll");
        var deferred = q.defer();
        ProjectModel.find(function(err, projects) {
            if(err) {
                deferred.reject(err);
            } else {
                //console.log(projects)
                deferred.resolve(projects);
            }
        });
        return deferred.promise;
    }

    function FindProjectByTitle(title){
        var deferred = q.defer();
        ProjectModel.findOne({title: title}, function(err, project) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(project);
            }
        });
        return deferred.promise;
    }

    function FindProjectsByUserId(userId){
        var deferred = q.defer();
        ProjectModel.find({userId: userId}, function(err, projects) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(projects);
            }
        });
        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();
        ProjectModel.findById(id, function(err, project) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(project);
            }
        });
        return deferred.promise;
    }

    function Update(id, project){
        var deferred = q.defer();
        delete project._id;
        ProjectModel.update({_id: id}, {$set: project}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                ProjectModel.findById(id, function(err, updatedProject) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedProject);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function Delete(id){
        var deferred = q.defer();
        ProjectModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    // *************** Project Sub Task api ***************
    function AddSubTask(projectId, subTask){
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project) {
            if(err) {
                deferred.reject(err);
            } else {
                // first check if array is undefined
                if(!project.subTasks) {
                    // if NOT project subTasks, then initialize the empty array
                    project.subTasks = [];
                }
                // now array is guaranteed to exist...
                project.subTasks.push(subTask);

                project.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function DeleteSubTask(projectId, subTaskId){
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                //console.log("In project.model.js: DeleteSubTask");
                var subTasks = project.subTasks;
                for(var i=0; i<subTasks.length; i++) {
                    if(subTasks[i]._id == subTaskId) {
                        subTasks.splice(i, 1);
                    }
                }
                project.subTasks = subTasks;
                project.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        //console.log(document);
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function FindProjectSubTasks(projectId){
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(project.subTasks);
            }
        });
        return deferred.promise;
    }

    function UpdateProjectSubTask(projectId, selectedSubTaskId, subTask) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                var projectSubTasks = project.subTasks;
                for(var i=0; i<projectSubTasks.length; i++){
                    if(projectSubTasks[i]._id == selectedSubTaskId){
                        projectSubTasks[i].name = subTask.name;
                        break;
                    }
                }

                project.subTasks = projectSubTasks;
                project.save(function(err, updatedProject) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedProject);
                    }
                });
            }
        });
        return deferred.promise;
    }

    // *************** Project Instructors api ***************
    function AddInstructorToProject(projectId, instructor) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project) {
            if(err) {
                deferred.reject(err);
            } else {
                // first check if array is undefined
                if(!project.instructors) {
                    // if NOT project subTasks, then initialize the empty array
                    project.instructors = [];
                }
                // now array is guaranteed to exist...
                project.instructors.push(instructor);

                project.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function RemoveInstructorFromProject(projectId, instructorId) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                //console.log("In project.model.js: RemoveInstructorFromProject");
                var instructors = project.instructors;
                for(var i=0; i<instructors.length; i++) {
                    if(instructors[i]._id == instructorId) {
                        instructors.splice(i, 1);
                    }
                }
                project.instructors = instructors;
                project.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        //console.log(document);
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function GetInstructorsForProject(projectId) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(project.instructors);
            }
        });
        return deferred.promise;
    }

    function UpdateInstructorForProject(projectId, selectedInstructorId, instructor) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                var projectInstructors = project.instructors;
                for(var i=0; i<projectInstructors.length; i++){
                    if(projectInstructors[i]._id == selectedInstructorId){
                        projectInstructors[i].email = instructor.email;
                        break;
                    }
                }

                project.instructors = projectInstructors;
                project.save(function(err, updatedProject) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedProject);
                    }
                });
            }
        });
        return deferred.promise;
    }

    // *************** Project Comments api ***************
    function AddComment(projectId, comment) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project) {
            if(err) {
                deferred.reject(err);
            } else {
                // first check if array is undefined
                if(!project.comments) {
                    // if NOT project subTasks, then initialize the empty array
                    project.comments = [];
                }
                // now array is guaranteed to exist...
                project.comments.push(comment);

                project.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function DeleteComment(projectId, commentId) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                //console.log("In project.model.js: RemoveInstructorFromProject");
                var comments = project.comments;
                for(var i=0; i<comments.length; i++) {
                    if(comments[i]._id == commentId) {
                        comments.splice(i, 1);
                    }
                }
                project.comments = comments;
                project.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        //console.log(document);
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function FindProjectComments(projectId) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(project.comments);
            }
        });
        return deferred.promise;
    }
};