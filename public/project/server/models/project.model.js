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
        UpdateProjectSubTask : UpdateProjectSubTask
    };
    return api;

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
        var deferred = q.defer();
        ProjectModel.find(function(err, projects) {
            if(err) {
                deferred.reject(err);
            } else {
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
        //console.log("In project.model.js");
        //console.log("Before updating in mongodb");
        //console.log(project);
        ProjectModel.update({_id: id}, {$set: project}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                ProjectModel.findById(id, function(err, updatedProject) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        //console.log("After updating in mongodb");
                        //console.log(updatedProject);
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

    // ***** Project Sub Tasks *****
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
                console.log("In project.model.js: DeleteSubTask");
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
                        console.log(document);
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function FindProjectSubTasks(projectId, projectFieldId){
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
        console.log("In project.model.js: UpdateProjectSubTask");
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                var projectSubTasks = project.subTasks;
                console.log(projectSubTasks);
                for(var i=0; i<projectSubTasks.length; i++){
                    if(projectSubTasks[i]._id == selectedSubTaskId){
                        projectSubTasks[i].name = subTask.name;
                        break;
                    }
                }
                console.log(projectSubTasks);

                //ProjectModel.update({_id: selectedSubTaskId}, {$set: subTask}, function(err, status) {
                //    if(err) {
                //        deferred.reject(err);
                //    } else {
                //        ProjectModel.findById(id, function (err, updatedProject) {
                //
                //        });
                //    }
                //});

                project.subTasks = projectSubTasks;
                project.save(function(err, updatedProject) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        console.log("After saving in mongodb");
                        console.log(updatedProject);
                        deferred.resolve(updatedProject);
                    }
                });
            }
        });
        return deferred.promise;
    }
};