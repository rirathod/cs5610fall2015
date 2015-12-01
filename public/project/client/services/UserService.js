"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("UserService", UserService);

    function UserService($http,$q) {
        var service = {
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByUsername : findUserByUsername,
            findUserByUsernamePasswordAndUserType: findUserByUsernamePasswordAndUserType,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsername(userName) {
            var defer = $q.defer();
            var url = "/api/project/user?username=" + userName;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserByUsernamePasswordAndUserType(userName, password, userType) {
            var defer = $q.defer();
            var url = "/api/project/user?username=" + userName + "&password=" + password + "&userType=" + userType;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    console.log("In UserService.js:");
                    console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserById(userId) {
            var defer = $q.defer();
            var url = "/api/project/user/" + userId;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllUsers() {
            var defer = $q.defer();
            var url = '/api/project/user';
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function createUser(user){
            var defer = $q.defer();
            var url = '/api/project/user';
            console.log(user);
            console.log(url);
            $http.post(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteUserById(userId) {
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId;
            console.log(url);
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateUser(user, userId) {
            var defer = $q.defer();
            var url = '/api/project/user/'+ userId;
            $http.put(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();