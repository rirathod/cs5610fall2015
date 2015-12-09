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

    function Create() {
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
};