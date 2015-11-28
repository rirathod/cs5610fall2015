/**
 * Created by riddhirathod on 11/28/15.
 */
"use strict";

module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        "label": String,
        "fieldType": String,
        "options": String,
        "placeholder": String
    });

    return FieldSchema;
};