/**
 * Created by riddhirathod on 11/30/15.
 */

"use strict";

module.exports = function(mongoose) {
    var ProjectFieldSchema = mongoose.Schema({
        "label": String,
        "fieldType": {type : String, enum: ["TEXT", "TEXTAREA", "DATE", "OPTIONS", "CHECKBOXES", "RADIOS"]},
        "options": [{label: String, value: String}],
        "placeholder": String
    });

    return ProjectFieldSchema;
};