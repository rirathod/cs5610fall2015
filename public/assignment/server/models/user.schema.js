/**
 * Created by riddhirathod on 11/26/15.
 */
module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        "firstName": String,
        "lastName": String,
        "username": String,
        "password": String,
        "email": String
    }, {collection: "assignment.user"});

    return UserSchema;
};