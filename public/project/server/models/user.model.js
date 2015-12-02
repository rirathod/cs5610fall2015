"use strict";
var q = require("q");

module.exports = function(mongoose, db){
    var UserSchema = require('./user.schema.js')(mongoose);
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        FindUserByUsername : FindUserByUsername,
        FindUserByCredentialsAndType : FindUserByCredentialsAndType
    };
    return api;

    function Create(user){
        var deferred = q.defer();
        UserModel.create(user, function(err, document) {
            UserModel.findById(document._id, function(err, createdUser) {
                deferred.resolve(createdUser);
            });
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();
        UserModel.findById(id, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function Update(id, user){
        var deferred = q.defer();
        UserModel.findById(id, function(err, userToUpdate) {
            if(err) {
                deferred.reject(err);
            } else {
                //console.log("In user.model.js: Update1");
                //console.log(userToUpdate);

                userToUpdate.firstName = user.firstName;
                userToUpdate.lastName = user.lastName;
                userToUpdate.username = user.username;
                userToUpdate.password = user.password;
                userToUpdate.email = user.email;
                userToUpdate.universityName = user.universityName;
                userToUpdate.save(function(err, document) {
                    //console.log("In user.model.js: Update2");
                    //console.log(document);
                    deferred.resolve(document);
                });
            }
        });
        return deferred.promise;
    }

    function Delete(id){
        var deferred = q.defer();
        UserModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function FindUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function FindUserByCredentialsAndType(userInfo) {
        var deferred = q.defer();
        UserModel.findOne({username: userInfo.username, password: userInfo.password, userType: userInfo.userType}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                //console.log("In user.model.js:");
                //console.log(user);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
};