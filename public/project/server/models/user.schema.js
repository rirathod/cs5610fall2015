/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";

module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email": String,
        "userType": String
    }, {collection: "cs5610.project.user"});

    return UserSchema;
};