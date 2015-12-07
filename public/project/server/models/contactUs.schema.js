/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";

module.exports = function(mongoose) {
    var ContactUsSchema = mongoose.Schema({
        "email": String,
        "message": String
    }, {collection: "cs5610.project.contactus"});

    return ContactUsSchema;
};