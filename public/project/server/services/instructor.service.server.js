"use strict";
module.exports = function(app, model) {
    app.post("/api/project/project/:projectId/instructor", AddInstructor);
    app.delete("/api/project/project/:projectId/instructor/:instructorId", RemoveInstructor);
    app.get("/api/project/project/:projectId/instructors", GetInstructors);
    app.put("/api/project/project/:projectId/instructor/:instructorId", UpdateInstructorById);

    function AddInstructor(req, res) {
        model
            .AddInstructorToProject(req.params.projectId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function RemoveInstructor(req, res) {
        model
            .RemoveInstructorFromProject(req.params.projectId, req.params.instructorId)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }

    function GetInstructors(req, res) {
        model
            .GetInstructorsForProject(req.params.projectId)
            .then(function(instructors) {
                res.json(instructors);
            });
    }

    function UpdateInstructorById(req, res) {
        model
            .UpdateInstructorForProject(req.params.projectId, req.params.instructorId, req.body)
            .then(function(updatedProject) {
                res.json(updatedProject);
            });
    }
};