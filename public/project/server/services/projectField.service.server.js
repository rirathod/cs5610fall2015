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
        console.log(req.params.formId);
        console.log(req.body);
        model
            .AddFormField(req.params.formId, req.body)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }

    function GetProjectFields(req, res){
        model
            .FindById(req.params.formId)
            .then(function(form) {
                res.json(form.fields);
            });
    }

    function GetProjectField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .FindField(formId,fieldId)
            .then(function(field) {
                res.json(field);
            });
    }

    function UpdateProjectField(req, res){
        model
            .UpdateFormField(req.params.formId, req.params.fieldId, req.body)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }

    function DeleteProjectField(req, res){
        model
            .DeleteFormField(req.params.formId, req.params.fieldId)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }
};