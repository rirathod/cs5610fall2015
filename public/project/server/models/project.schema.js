/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";

module.exports = function(mongoose) {
    var ProjectFieldSchema = require('./projectField.schema.js')(mongoose);
    var ProjectSchema = mongoose.Schema({
        "title": String,
        "userId": String,
        "description": String,
        "status": {type : String, enum: ["NOT STARTED", "STARTED", "COMPLETED"]},
        "githubUsername": String,
        "githubReponame":  String,
        "subTasks": [{name: String}],
        "commits": [{committer: String, committerHtmlUrl:String, message: String, commitHtmlUrl: String, timestamp: String}]
    }, {collection: "cs5610.project.project"});

    return ProjectSchema;
};