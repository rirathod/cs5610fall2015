"use strict";
module.exports = function(app,model) {
    app.post("/api/project/project/:projectId/instructor", AddInstructor);
    app.delete("/api/project/project/:projectId/instructor/:instructorId", RemoveInstructor);

    function AddInstructor(req, res) {
        //console.log("In instructor.service.server.js: AddInstructor");
        //console.log(req.params.projectId);
        //console.log(req.body);
        model
            .AddInstructorToProject(req.params.projectId, req.body)
            .then(function(project) {
                //console.log("In instructor.service.server.js: model.AddInstructorToProject");
                //console.log(project);
                res.json(project);
            });
    }

    function RemoveInstructor(req, res) {
        model
            .RemoveInstructorFromProject(req.params.projectId, req.params.instructorId)
            .then(function() {
                res.json
            });
    }
};