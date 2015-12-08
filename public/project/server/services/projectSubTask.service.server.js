/**
 * Created by riddhirathod on 12/1/15.
 */
"use strict";
module.exports = function(app,model){
    app.post("/api/project/project/:projectId/projectSubTask", CreateSubTaskForProject);
    app.delete("/api/project/project/:projectId/projectSubTask/:subTaskId", DeleteSubTaskForProject);
    app.get("/api/project/project/:projectId/projectSubTasks", GetSubTasksForProject);
    app.put("/api/project/project/:projectId/projectSubTask/:subTaskId", UpdateSubTaskById);

    function CreateSubTaskForProject(req, res) {
        model.
            AddSubTask(req.params.projectId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function DeleteSubTaskForProject(req, res) {
        //console.log("In projectSubTask.service.server.js: DeleteSubTaskForProject");
        model.
            DeleteSubTask(req.params.projectId, req.params.subTaskId)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function GetSubTasksForProject(req, res){
        model
            .FindProjectSubTasks(req.params.projectId)
            .then(function(projectSubTasks) {
                res.json(projectSubTasks);
            });
    }

    function UpdateSubTaskById(req, res){
        var projectId = req.params.projectId;
        var selectedSubTaskId = req.params.subTaskId;
        model
            .UpdateProjectSubTask(projectId, selectedSubTaskId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }
};