"use strict";

module.exports = function(app,model){

    app.post("/api/assignment/user/:userId/form", CreateForm);
    app.get("/api/assignment/user/:userId/form", GetForms);
    app.get("/api/assignment/form/:formId", GetForm);
    app.put("/api/assignment/form/:formId",UpdateForm);
    app.delete("/api/assignment/form/:formId", DeleteForm);
    app.get("/api/assignment/form?formTitle=formTitle", GetFormByTitle);

    function CreateForm(req,res){
        res.json(model.Create(req.body,req.params.userId));
    }

    function GetForms(req,res){
        var userId = req.params.userId;
        console.log(userId);
        res.json(model.FindFormsByUserId(userId));
    }

    function GetForm(req,res){
        res.json(model.FindById(req.params.formId));
    }

    function GetFormByTitle(req,res){
        var formTitle = req.param("formTitle");
        res.json(model.FindFormByTitle(formTitle));
    }

    function UpdateForm(req,res){
        res.json(model.Update(req.params.formId,req.body));
    }

    function DeleteForm(req,res){
        res.json(model.Delete(req.params.formId));
    }
};