/**
 * Created by riddhirathod on 12/1/15.
 */

"use strict";
module.exports = function(app,model){
    app.post("/api/project/user/:userId/project", CreateProject);
    app.get("/api/project/user/:userId/project", GetProjects);
    app.get("/api/project/project/:projectId", GetProject);
    app.put("/api/project/project/:projectId",UpdateProject);
    app.delete("/api/project/project/:projectId", DeleteProject);
    app.get("/api/project/project?projectTitle=projectTitle", GetProjectByTitle);

    function CreateProject(req,res){
        model
            .Create(req.body, req.params.userId)
            .then(function(project) {
                res.json(project);
            });
    }

    function GetProjects(req, res){
        console.log("project.service.server.js: GetProjects: " + req.params.userId);
        model
            .FindProjectsByUserId(req.params.userId)
            .then(function(projects) {
                res.json(projects);
            });
    }

    function GetProject(req, res){
        model
            .FindById(req.params.projectId)
            .then(function(project) {
                res.json(project);
            });
    }

    function GetProjectByTitle(req, res){
        var projectTitle = req.param("projectTitle");
        model
            .FindProjectByTitle(projectTitle)
            .then(function(project) {
                res.json(project);
            });
    }

    function UpdateProject(req, res){
        model
            .Update(req.params.projectId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function DeleteProject(req, res){
        model
            .Delete(req.params.projectId)
            .then(function(status) {
                res.json(status);
            });
    }
};