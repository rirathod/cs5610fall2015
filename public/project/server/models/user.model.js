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
        FindUserByCredentialsAndType : FindUserByCredentialsAndType,
        FindUserByCredentials: FindUserByCredentials,
        FindUserByUsername : FindUserByUsername
    };
    return api;

    function Create(user){
        var deferred = q.defer();
        //console.log(user);

        // Checks if a user exists, if yes then return null, else create new one
        FindUserByCredentialsAndType(user)
            .then(function(foundUser) {
                if(foundUser!= null) {
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function(err, document) {
                        UserModel.findById(document._id, function(err, createdUser) {
                            deferred.resolve(createdUser);
                        });
                    });
                }
            }, function(err) {
                deferred.reject(err);
            });

        // Old implementation
        //UserModel.create(user, function(err, document) {
        //    UserModel.findById(document._id, function(err, createdUser) {
        //        deferred.resolve(createdUser);
        //    });
        //});
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
                userToUpdate.firstName = user.firstName;
                userToUpdate.lastName = user.lastName;
                userToUpdate.username = user.username;
                userToUpdate.password = user.password;
                userToUpdate.email = user.email;
                userToUpdate.universityName = user.universityName;
                userToUpdate.save(function(err, document) {
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

    function FindUserByCredentials(userInfo) {
        var deferred = q.defer();
        UserModel.findOne({username: userInfo.username, password: userInfo.password}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function FindUserByCredentialsAndType(userInfo) {
        //console.log(userInfo);
        var deferred = q.defer();
        UserModel.findOne({username: userInfo.username, password: userInfo.password, userType: userInfo.userType}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
};