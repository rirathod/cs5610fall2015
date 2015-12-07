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
            var userType = user.usertype;

            UserService.findUserByUsernamePasswordAndUserType(username, password, userType)
                .then(function(currentUser) {
                    //console.log(currentUser);

                    if (currentUser) {
                        $rootScope.loggedInUser = currentUser;

                        //Navigate to user home pages
                        //if(currentUser.userType === "admin"
                        //|| currentUser.userType === "Admin"
                        //|| currentUser.userType === "ADMIN") {
                        //    $location.path("/profile");
                        //} else {
                        //    $location.path("/profile");
                        //}
                        $location.path("/profile");
                    } else {
                        $scope.error = "Username/Password combination does not exist";
                    }
                });
        }
    }
})();