"use strict";

var q = require("q");

module.exports = function(mongoose, db){
    //var forms = require("./form.mock.json");
    var FormSchema = require('./form.schema.js')(mongoose);
    var FormModel  = mongoose.model("FormModel", FormSchema);

    var api = {
        Create : Create,
        FindAll : FindAll,
        FindFormByTitle : FindFormByTitle,
        FindFormsByUserId : FindFormsByUserId,
        FindById : FindById,
        Update : Update,
        Delete : Delete,

        AddFormField : AddFormField,
        FindField : FindField,
        UpdateFormField : UpdateFormField,
        DeleteFormField : DeleteFormField
    };
    return api;

    function Create(form, userId){
        var deferred = q.defer();
        form.userId = userId;
        form.fields = [];
        FormModel.create(form, function(err, createdForm) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(createdForm);
            }
        });
        return deferred.promise;

        //form.userId = userId;
        //form.id = guid();
        //form.fields = [];
        //forms.push(form);
        //return forms;
    }

    function FindAll(){
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;

        //return forms;
    }

    function FindFormByTitle(title){
        var deferred = q.defer();
        FormModel.findOne({title: title}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;

        //for(var i=0; i<forms.length; i++){
        //    if(title === forms[i].title){
        //        return forms[i];
        //    }
        //}
        //return null;
    }

    function FindFormsByUserId(userId){
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;

        //var userForms = [];
        //for(var i=0; i<forms.length; i++){
        //    console.log(forms[i].userId);
        //    if(forms[i].userId == userId){
        //        userForms.push(forms[i]);
        //    }
        //}
        //return userForms;
    }

    function FindById(id){
        var deferred = q.defer();
        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;

        //for(var i=0; i<forms.length; i++){
        //    if(id === forms[i].id){
        //        return forms[i];
        //    }
        //}
        //return null;
    }

    function Update(id, form){
        var deferred = q.defer();
        FormModel.findById(id, function(err, formToUpdate) {
            if(err) {
                deferred.reject(err);
            } else {
                formToUpdate.title = form.title;
                formToUpdate.save(function(err, updatedForm) {
                    deferred.resolve(updatedForm);
                });
            }
        });
        return deferred.promise;

        //for(var i=0; i<forms.length; i++){
        //    if(id === forms[i].id){
        //        forms[i].title = form.title;
        //        forms[i].userId = form.userId;
        //        return forms[i];
        //    }
        //}
        //return null;
    }

    function Delete(id){
        var deferred = q.defer();
        FormModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;

        //console.log(id);
        //for(var i=0; i<forms.length; i++) {
        //    if (id == forms[i].id) {
        //        forms.splice(i, 1);
        //    }
        //}
        //
        //return forms;
    }

    function AddFormField(formId, field){
        var deferred = q.defer();
        formModel.findById(formId, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                formFields.push(field);
                form.fields = formFields;
                form.save(function(err, updatedForm) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;

        //field.id = guid();
        //for(var i=0; i<forms.length; i++) {
        //    if (formId === forms[i].id) {
        //        if(forms[i].fields == null) {
        //            forms[i].fields = [];
        //        }
        //        forms[i].fields.push(field);
        //        return forms[i].fields;
        //    }
        //}
    }

    function FindField(formId,fieldId){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == fieldId){
                        deferred.resolve(formFields[i]);
                    }
                }
            }
        });
        return deferred.promise;

        //for(var i=0; i<forms.length; i++) {
        //    if (forms[i].id === formId) {
        //        for (var j=0; j < forms[i].fields.length; j++) {
        //            if (forms[i].fields[j].id === fieldId) {
        //                return forms[i].fields[j];
        //            }
        //        }
        //    }
        //}
        //return null;
    }

    function UpdateFormField(formId, fieldId, field){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == fieldId){
                        formFields[i] = field;
                        break;
                    }
                }
                form.fields = formFields;
                form.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;

        //for(var i=0; i<forms.length; i++){
        //    if(forms[i].id === formId){
        //        for(var j = 0; j<forms[i].fields.length; j++){
        //            if(forms[i].fields[j].id === fieldId){
        //                forms[i].fields[j] = field;
        //            }
        //        }
        //        return forms[i].fields;
        //    }
        //}
    }

    function DeleteFormField(formId, fieldId){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == fieldId){
                        fields.splice(i,1);
                    }
                }
                form.fields = formFields;
                form.save(function(err, document) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;

        //for(var i=0; i<forms.length; i++){
        //    if(forms[i].id == formId){
        //        for(var j = 0; j<forms[i].fields.length; j++){
        //            if(forms[i].fields[j].id === fieldId){
        //                forms[i].fields.splice(j,1);
        //            }
        //        }
        //        return forms[i].fields;
        //    }
        //}
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};