/**
 * Created by riddhirathod on 11/30/15.
 */

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
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
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

        function findUserByUsernameAndPassword(userName, password) {
            var defer = $q.defer();
            var url = "/api/project/user?username=" + userName + "&password=" + password;
            console.log(url);
            $http.get(url)
                .success(function(response){
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