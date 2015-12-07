/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
var q = require("q");

module.exports = function(mongoose, db){
    var ContactUsSchema = require('./contactUs.schema.js')(mongoose);
    var ContactUsModel  = mongoose.model("ContactUsModel", ContactUsSchema);

    var api = {
        Create: Create
    };
    return api;

    // ***** ContactUsMessage api *****
    function Create(messageObj) {
        var deferred = q.defer();
        ContactUsModel.create(messageObj, function(err, createdMessage) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(createdMessage);
            }
        });
        return deferred.promise;
    }
};