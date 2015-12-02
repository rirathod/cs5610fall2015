/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
var q = require("q");

module.exports = function(mongoose, db){
    //var forms = require("./form.mock.json");
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

        AddProjectField : AddProjectField,
        FindProjectField : FindProjectField,
        UpdateProjectField : UpdateProjectField,
        DeleteProjectField : DeleteProjectField
    };
    return api;

    function Create(project, userId){
        var deferred = q.defer();
        project.userId = userId;
        project.fields = [];
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
        ProjectModel.findById(id, function(err, projectToUpdate) {
            if(err) {
                deferred.reject(err);
            } else {
                projectToUpdate.title = project.title;
                projectToUpdate.save(function(err, updatedProject) {
                    deferred.resolve(updatedProject);
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

    function AddProjectField(projectId, projectField){
        console.log(projectField);
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project) {
            if(err) {
                deferred.reject(err);
            } else {
                var projectFields = project.projectFields;
                console.log("Before");
                console.log(projectFields);
                projectFields.push(projectField);
                console.log("After");
                console.log(projectFields);
                project.projectFields = projectFields;
                console.log("updatedProject");
                console.log(project);
                project.save(function(err, document) {
                    console.log(document);
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

    function FindProjectField(projectId, projectFieldId){
        var deferred = q.defer();
        ProjectModel.findById(formId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                var projectFields = project.projectFields;
                for(var i=0; i<projectFields.length; i++){
                    if(projectFields[i]._id == projectId){
                        deferred.resolve(projectFields[i]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function UpdateProjectField(projectId, projectFieldId, projectField){
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                var projectFields = project.projectFields;
                for(var i=0; i<projectFields.length; i++){
                    if(projectFields[i]._id == projectFieldId){
                        projectFields[i] = projectField;
                        break;
                    }
                }
                project.projectFields = projectFields;
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

    function DeleteProjectField(projectId, projectFieldId){
        var deferred = q.defer();
        ProjectModel.findById(projectId, function(err, project){
            if(err) {
                deferred.reject(err);
            } else {
                var projectFields = project.projectFields;
                for(var i=0; i<projectFields.length; i++){
                    if(projectFields[i]._id == projectFieldId){
                        projectFields.splice(i,1);
                    }
                }
                project.projectFields = projectFields;
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
};