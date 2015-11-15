var q = require("q");
var users = require("./user.mock.json");

module.exports = function(app){
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

    function createUser(user) {
        //var deferred = q.defer();
        //
        //PageModel.create(page, function(err, doc){
        //    PageModel.find(function(err, pages){
        //        deferred.resolve(pages);
        //    });
        //});
        //return deferred.promise;
        users.push(user);
        return users;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(id) {
        for (user in users) {
            if (user.id == id) {
                return user;
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (user in users) {
            if (user.username == username) {
                return user;
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        for (user in users) {
            if (user.username == username && user.password == password) {
                return user;
            }
        }
        return null;
    }

    function updateUserById(id, user) {
        users.replace();
        for (var i = 0; i < users.length; i++) {
            if (users[i] && users[i].id == id) {
                users[i] = user;
                break;
            }
        }
        return users;
    }

    function deleteUserById(id) {
        var userIndex = 0;
        for (var i = 0; i < users.length; i++) {
            if (users[i] && users[i].id == id) {
                break;
            }
        }
        users.splice(userIndex, 1);
        return users;
    }
};
