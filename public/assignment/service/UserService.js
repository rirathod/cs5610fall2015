(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService()
    {
        var users = [];

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function createUser(user, callback) {
            users.push(user);
            return callback(user);
        }

        function findAllUsers(callback) {
            return callback(users);
        }

        function findUserByUsernameAndPassword(username, password, callback) {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++) {
                if (users[i].username == username && users[i].password == password) {
                    return callback(users[i]);
                }
            }
            return callback(null);
        }

        function deleteUserById(userGuid, callback) {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++) {
                if (users[i].id == userGuid) {
                    users.splice(i, 1);
                    return callback(users);
                }
            }
            return callback(null);
        }

        function updateUser(userGuid, user, callback) {
            var arrayLength = users.length;
            for (var i = 0; i < arrayLength; i++) {
                if (users[i].id == userGuid) {
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].firstname = user.firstname;
                    users[i].lastname = user.lastname;
                    users[i].email = user.email;
                    return callback(users[i]);
                }
            }
            return callback("User not found");
        }
    }
})();