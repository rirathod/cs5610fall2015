"use strict";

module.exports = function(app,model){

    app.post("/api/assignment/form/:formId/field", CreateFormField);
    app.get("/api/assignment/form/:formId/field", GetFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", GetFormField);
    app.put("/api/assignment/form/:formId/field/:fieldId", UpdateFormField);
    app.delete("/api/assignment/form/:formId/field/:fieldId",DeleteFormField);

    function CreateFormField(req,res) {
        res.json(model.AddFormField(req.params.formId, req.body));
    }

    function GetFormFields(req,res){
        res.json(model.FindById(req.params.formId).fields);
    }

    function GetFormField(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.FindField(formId,fieldId));
    }

    function UpdateFormField(req,res){
        res.json(model.UpdateFormField(req.params.formId, req.params.fieldId, req.body));
    }

    function DeleteFormField(req,res){
        res.json(model.DeleteFormField(req.params.formId, req.params.fieldId));
    }
};