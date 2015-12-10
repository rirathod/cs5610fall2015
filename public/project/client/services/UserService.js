"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("UserService", UserService);

    function UserService($http,$q) {
        var service = {
            // Passportjs
            //signin: signin,
            //signout: signout,

            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByUsername : findUserByUsername,
            findUserByUsernamePasswordAndUserType: findUserByUsernamePasswordAndUserType,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        /* Passportjs
        function signin(user) {
            console.log("In UserService.js: signin");
            var defer = $q.defer();
            $http.post("/api/project/signin", user)
                .success(function(response) {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function signout() {
            var defer = $q.defer();
            $http.post("/api/project/signout")
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }
        */

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
            //console.log(url);
            $http.get(url)
                .success(function(response){
                    //console.log("In UserService.js:");
                    //console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserById(userId) {
            var defer = $q.defer();
            var url = "/api/project/user/" + userId;
            //console.log(url);
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
            //console.log(url);
            //console.log("In UserService.js: updateUser");
            //console.log(user);
            $http.put(url, user)
                .success(function(response){
                    //console.log(response);
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();