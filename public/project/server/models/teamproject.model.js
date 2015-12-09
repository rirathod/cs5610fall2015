/**
 * Created by riddhirathod on 12/8/15.
 */
"use strict";
var q = require("q");

module.exports = function(mongoose, db) {
    var TeamProjectSchema = require('./teamproject.schema.js')(mongoose);
    var TeamProjectModel = mongoose.model("TeamProjectModel", TeamProjectSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindProjectByTitle: FindProjectByTitle,
        FindProjectsByUserId: FindProjectsByUserId,
        FindById: FindById,
        Update: Update,
        Delete: Delete

        //AddSubTask: AddSubTask,
        //DeleteSubTask: DeleteSubTask,
        //FindProjectSubTasks: FindProjectSubTasks,
        //UpdateProjectSubTask: UpdateProjectSubTask,
        //
        //AddInstructorToProject: AddInstructorToProject,
        //RemoveInstructorFromProject: RemoveInstructorFromProject,
        //GetInstructorsForProject: GetInstructorsForProject,
        //UpdateInstructorForProject: UpdateInstructorForProject
    };
    return api;

    function Create(userId, teamproject) {
        var deferred = q.defer();
        teamproject.members = [];
        teamproject.members.push(userId);
        TeamProjectModel.create(teamproject, function(err, createdTeamproject) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(createdTeamproject);
            }
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        return deferred.promise;
    }

    function FindProjectByTitle() {
        var deferred = q.defer();
        return deferred.promise;
    }

    function FindProjectsByUserId() {
        var deferred = q.defer();
        return deferred.promise;
    }

    function FindById() {
        var deferred = q.defer();
        return deferred.promise;
    }

    function Update() {
        var deferred = q.defer();
        return deferred.promise;
    }

    function Delete() {
        var deferred = q.defer();
        return deferred.promise;
    }
};