(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService()
    {
        var currentUsers = [
            {guid: Guid.create(), username: "Alex", password: "alex"},
            {guid: Guid.create(), username: "Bob", password: "bob"},
            {guid: Guid.create(), username: "Charlie", password: "charlie"}
        ];

        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password, callback1) {
            var arrayLength = currentUsers.length;
            for (var i = 0; i < arrayLength; i++) {
                if (currentUsers[i].username == username && currentUsers[i].password == password) {
                    return {username: "username", password:"password"};
                } else {
                    return null;
                }
            }
        }

        function callback1(value) {
            console.log(value);
        }

        function findAllUsers(callback2) {
            return currentUsers;
        }

        function callback2(value) {
            console.log(value);
        }

        function createUser(user, callback3) {
            var guid = Guid.create();
            user = {guid: guid, username: user.username, password: user.password};
            currentUsers.push(user);
            return user;
        }

        function callback3(value) {
            console.log(value);
        }

        function deleteUserById(userGuid, callback4) {
            var arrayLength = currentUsers.length;
            for (var i = 0; i < arrayLength; i++) {
                if (currentUsers[i].guid == userGuid) {
                    currentUsers.splice(i, 1);
                    return currentUsers;
                } else {
                    return null;
                }
            }
        }

        function callback4(value) {
            console.log(value);
        }

        function updateUser(userGuid, user, callback5) {
            var arrayLength = currentUsers.length;
            for (var i = 0; i < arrayLength; i++) {
                if (currentUsers[i].guid == userGuid) {
                    currentUsers[i] = user;
                    return currentUsers[i];
                } else {
                    return null;
                }
            }
        }

        function callback5(value) {
            console.log(value);
        }
    }
})();