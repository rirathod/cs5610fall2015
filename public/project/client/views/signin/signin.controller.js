/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("SignInController", SignInController);

    function SignInController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $rootScope.loggedInUser = null;

        $scope.signin = signin;
        function signin(user) {
            var username = user.username;
            var password = user.password;
            var userType = user.userType;

            UserService.findUserByUsernamePasswordAndUserType(username, password, userType)
                .then(function(currentUser) {
                    if (currentUser) {
                        $rootScope.loggedInUser = currentUser;
                        $location.path("/profile");
                    } else {
                        $scope.error = "Username/Password combination does not exist";
                    }
                });
        }

        /* Passportjs
        function signin(user) {
            console.log("In signin.controller.js: signin");
            UserService.signin(user)
                .then(function(response) {
                if(response != null) {
                    $rootScope.loggedInUser = response;
                    $location.url("/profile");
                } else {
                    $scope.error = "Username/Password combination does not exist";
                }
            });
        }
        */
    }
})();