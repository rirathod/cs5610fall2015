(function() {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", ['$http', '$q', '$rootScope', UserService]);

    function UserService($http, $q, $rootScope)
    {
        var service = {
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findAllUsers : findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function createUser(user) {
            var deferred = $q.defer();

            $http.post("/api/assignment/user", user)
                .success(function(newlyCreatedUser){
                    deferred.resolve(newlyCreatedUser);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get("/api/assignment/user")
                .success(function(users){
                    deferred.resolve(users);
                })
                .error(function(error){
                    if (error && error.message){
                        deferred.reject(error.message);
                    } else{
                        deferred.reject(error);
                    }
                });
            return deferred.promise;
        }

        function findUserByUsernameAndPassword(username, password) {
            var deffered = $q.defer();

            $http.get("/api/assignment/user?username="+username+"&password="+password)
                .success(function(user) {
                    deffered.resolve(user);
                })
                .error(function(error) {
                    if (error && error.message) {
                        deferred.reject(error.message);
                    } else {
                        deferred.reject(error);
                    }
                });
            return deffered.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/:id"+userId)
                .sucess(function() {

                })
                .error(function() {

                });
        }

        function updateUser(userId, user) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+userId, user)
                .success(function(updatedUser){
                    deferred.resolve(updatedUser);
                })
                .error(function(error) {
                    if (error && error.message) {
                        deferred.reject(error.message);
                    } else {
                        deferred.reject(error);
                    }
                });
        }
    }
})();