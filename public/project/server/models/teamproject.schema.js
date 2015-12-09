/**
 * Created by riddhirathod on 12/8/15.
 */
"use strict";

module.exports = function(mongoose) {
    var TeamProjectSchema = mongoose.Schema({
        "title": String,
        "members": [{userId: String}],
        "description": String,
        "status": {type : String, enum: ["NOT STARTED", "STARTED", "COMPLETED"]},
        "githubUsername": String,
        "githubReponame":  String,
        "subTasks": [{name: String}],
        "commits": [{committer: String, committerHtmlUrl:String, message: String, commitHtmlUrl: String, timestamp: String}],
        "instructors": [{email: String}]
    }, {collection: "cs5610.project.teamproject"});

    return TeamProjectSchema;
};