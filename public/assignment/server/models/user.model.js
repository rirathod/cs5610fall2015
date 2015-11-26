"use strict";

var q = require("q");

module.exports = function(mongoose, db){
    //var users = require("./user.mock.json");
    var UserSchema = require('./user.schema.js')(mongoose);
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        FindUserByUsername : FindUserByUsername,
        FindUserByCredentials : FindUserByCredentials
    };
    return api;

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function Create(user){
        var deferred = q.defer();
        UserModel.create(user, function(err, document) {
            UserModel.findById(document._id, function(err, createdUser) {
                console.log(createdUser);
                deferred.resolve(createdUser);
            });
        });
        return deferred.promise;

        //user.id = guid();
        ////console.log(user);
        //users.push(user);
        //return user;
    }

    function FindAll(){
        return users;
    }

    function FindById(id){
        //console.log(id);
        for(var i = 0; i<users.length; i++) {
            console.log(users[i].id);
            if(id == users[i].id){
                return users[i];
            }
        }
    }

    function Update(id, user){
        for(var i = 0; i<users.length; i++) {
            if(id == users[i].id){
                users[i] = user;
                return users[i];
            }
        }
        return null;
    }

    function Delete(id){
        for(var i = 0; i<users.length; i++) {
            if (id == users[i].id) {
                users.splice(i, 1);
            }
        }
        return users;
    }

    function FindUserByCredentials(credentials) {
        var usr = credentials.username;
        var pwd = credentials.password;
        for(var i = 0; i<users.length; i++){
            if(usr === users[i].username && pwd === users[i].password){
                return users[i];
            }
        }
        return null;
    }

    function FindUserByUsername(username) {
        for(var i = 0; i<users.length; i++){
            if(username === users[i].username){
                return users[i];
            }
        }
        return null;
    }
};