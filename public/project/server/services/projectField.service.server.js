/**
 * Created by riddhirathod on 12/1/15.
 */
"use strict";
module.exports = function(app,model){
    app.post("/api/project/project/:projectId/projectField", CreateProjectField);
    app.get("/api/project/project/:projectId/projectField", GetProjectFields);
    app.get("/api/project/project/:projectId/projectField/:projectFieldId", GetProjectField);
    app.put("/api/project/project/:projectId/projectField/:projectFieldId", UpdateProjectField);
    app.delete("/api/project/project/:projectId/projectField/:projectFieldId",DeleteProjectField);

    function CreateProjectField(req, res) {
        console.log(req.params.projectId);
        console.log(req.body);
        model
            .AddFormField(req.params.projectId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function GetProjectFields(req, res){
        model
            .FindById(req.params.projectId)
            .then(function(project) {
                res.json(project.projectFields);
            });
    }

    function GetProjectField(req, res){
        var projectId = req.params.projectId;
        var projectFieldId = req.params.projectFieldId;
        model
            .FindField(projectId, projectFieldId)
            .then(function(projectField) {
                res.json(projectField);
            });
    }

    function UpdateProjectField(req, res){
        model
            .UpdateFormField(req.params.projectId, req.params.projectId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function DeleteProjectField(req, res){
        model
            .DeleteFormField(req.params.projectId, req.params.projectFieldId)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }
};