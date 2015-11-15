"use strict";

var q = require("q");
var Promise = require('bluebird');

module.exports = function(app){

    //Local Empty Array of Users
    var users = require("./user.mock.json");

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function createUser(user){
        try {
            return new Promise(function(resolve, reject){
                if (!user || typeof user !== 'object'){
                    return reject("please provide a valid user object");
                } else {
                    user.id = guid();
                    user.role = [];
                    users.push(user);
                    return resolve(user);
                }
            });
        } catch(error){
            console.log("Exception in 'createUser' method in user.model.js", error);
            return Promise.reject(error);
        }
    }

    function findAllUsers(){
        return users;
        //try {
        //    return new Promise.resolve(users);
        //} catch(error){
        //    console.log("Exception in 'findAllUsers' method in user.model.js", error);
        //    return Promise.reject(error);
        //}
    }

    function findUserById(userId){
        try{
            var currentUser;
            var currentIndex;
            return new Promise(function(resolve, reject){
                users.forEach(function(user, index){
                    if (user && user.id==userId) {
                        currentUser = user;
                        currentIndex = index;
                    }
                });
                if (currentUser){
                    return resolve(currentUser);
                } else {
                    return reject("No user found with id:"+userId);
                }
            });
        } catch(error){
            console.log("Exception in 'findUserById' method in user.model.js", error);
            return Promise.reject(error);
        }
    }

    function findUserByUsername(username){
        try {
            var currentUser;
            var currentIndex;
            return new Promise(function(resolve, reject){
                if (!username || typeof username==="undefined"){
                    return reject("Please provide valid username");
                } else {
                    users.forEach(function(user, index){
                        if (user && user.username===username)
                        {
                            currentUser = user;
                            currentIndex = index;
                        }
                    });
                    if (currentUser){
                        return resolve(currentUser);
                    } else {
                        return reject("No user found with username:"+username);
                    }
                }
            });
        } catch(error){
            console.log("Exception in 'findUserByUsername' method in user.model.js", error);
            return Promise.reject(error);
        }
    }

    function findUserByCredentials(credentials){
        try{
            return new Promise(function(resolve, reject){
                if (!credentials || typeof credentials !== 'object'){
                    return reject("Please provide a valid credential object");
                } else if(!credentials.username || !credentials.password) {
                    return reject("Username or password not found in the credentials");
                } else {
                    var currentUser;
                    var currentIndex;
                    users.forEach(function(user, index){
                        if (user && user.username===credentials.username && user.password===credentials.password)
                        {
                            currentUser = user;
                            currentIndex = index;
                        }
                    });
                    if (currentUser){
                        return resolve(currentUser);
                    } else {
                        return reject("No User found with credentials (username,password): ("+credentials.username+","+credentials.password+")");
                    }
                }
            });
        } catch(error){
            console.log("Exception in 'findUserByCredentials' method in user.model.js", error);
            return Promise.reject(error);
        }
    }

    function updateUserById(userId, updatedUser){
        try{
            return new Promise(function(resolve, reject){
                var found = false;
                var userAfterUpdate;
                users.forEach(function(user){
                    if (user && user.id===userId){
                        found = true;
                        //Updating only newly properties from the input updatedUser object
                        for(var property in user){
                            if (updatedUser[property]){
                                user[property] = updatedUser[property];
                            }
                        }
                        user.id = userId;
                        userAfterUpdate = user;
                    }
                });
                if (found) {
                    return resolve(userAfterUpdate);
                } else {
                    return reject("Error finding user with id:"+userId);
                }
            });
        } catch(error){
            console.log("Exception in 'updateUser' method in user.model.js", error);
            return Promise.reject(error);
        }
    }

    function deleteUserById(userId){
        try {
            return new Promise(function(resolve, reject){
                if (!userId || typeof userId==="undefined"){
                    return reject("Please provide a valid userId");
                } else {
                    users.forEach(function(user, index){
                        if (user.id == userId){
                            users.splice(index, 1);
                            console.log("Successfully deleted user with id "+userId);
                        }
                    });
                    return resolve(users);
                }
            });
        } catch(error){
            console.log("Exception in 'removeUser' method in user.model.js", error);
            return Promise.reject(error);
        }
    }

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};