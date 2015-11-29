"use strict";

module.exports = function(app,model){

    app.post("/api/assignment/user/:userId/form", CreateForm);
    app.get("/api/assignment/user/:userId/form", GetForms);
    app.get("/api/assignment/form/:formId", GetForm);
    app.put("/api/assignment/form/:formId",UpdateForm);
    app.delete("/api/assignment/form/:formId", DeleteForm);
    app.get("/api/assignment/form?formTitle=formTitle", GetFormByTitle);

    function CreateForm(req,res){
        model
            .Create(req.body, req.params.userId)
            .then(function(form) {
                res.json(form);
            });
        //res.json(model.Create(req.body,req.params.userId));
    }

    function GetForms(req, res){
        console.log("forms.service.server.js: GetForms: " + req.params.userId);
        model
            .FindFormsByUserId(req.params.userId)
            .then(function(forms) {
                res.json(forms);
            });
    }

    function GetForm(req, res){
        model
            .FindById(req.params.formId)
            .then(function(form) {
                res.json(form);
            });
    }

    function GetFormByTitle(req, res){
        var formTitle = req.param("formTitle");
        model
            .FindFormByTitle(formTitle)
            .then(function(form) {
                res.json(form);
            });
    }

    function UpdateForm(req, res){
        model
            .Update(req.params.formId, req.body)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }

    function DeleteForm(req, res){
        model
            .Delete(req.params.formId)
            .then(function(status) {
                res.json(status);
            });
    }
};