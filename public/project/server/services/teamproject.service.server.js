/**
 * Created by riddhirathod on 12/8/15.
 */
"use strict";
module.exports = function(app,model) {
    app.post("/api/project/user/:userId/teamproject", CreateTeamProject);
    app.get("/api/project/teamproject", GetAllTeamProjects);
    app.get("/api/project/teamproject?teamprojectTitle=teamprojectTitle", GetTeamProjectByTitle);
    app.get("/api/project/user/:userId/teamproject", GetTeamProjectsForUser);
    app.get("/api/project/teamproject/:teamprojectId", GetTeamProject);
    app.put("/api/project/teamproject/:teamprojectId", UpdateTeamProject);
    app.delete("/api/project/teamproject/:teamprojectId", DeleteTeamProject);

    function CreateTeamProject(req, res) {
        model
            .Create(req.body, req.params.userId)
            .then(function(teamproject) {
                res.json(teamproject);
            });
    }

    function GetAllTeamProjects(req, res) {

    }

    function GetTeamProjectByTitle(req, res) {

    }

    function GetTeamProjectsForUser(req, res) {

    }

    function GetTeamProject(req, res) {

    }

    function UpdateTeamProject(req, res) {

    }

    function DeleteTeamProject(req, res) {

    }
};