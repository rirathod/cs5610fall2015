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

        $scope.signin = signin;

        function signin(user) {
            var username = user.username;
            var password = user.password;
            var userType = user.usertype;

            //console.log(username);
            //console.log(password);
            //console.log(userType);
            UserService.findUserByUsernamePasswordAndUserType(username, password, userType)
                .then(function(currentUser) {
                    //console.log(currentUser);

                    if(currentUser != null) {
                        $rootScope.user = currentUser;

                        //Navigate to user home pages
                        if(currentUser.userType === "Student") {
                            $location.path("/studenthome");
                        } else {
                            $location.path("/instructorhome");
                        }

                        //$location.path("/profile");
                        //$scope.message = "User logged in successfully";
                    } else {
                        $scope.message = "Username/Password combination does not exist";
                    }
                });
        }
    }
})();