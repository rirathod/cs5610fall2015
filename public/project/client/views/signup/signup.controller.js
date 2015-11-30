/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("SignUpController", SignUpController);

    function SignUpController($scope, $location) {
        $scope.$location = $location;

        $scope.signup = signup;

        function signup() {
            if($scope.username, $scope.password, $scope.verifyPassword, $scope.email, $scope.usertype) {
                if ($scope.password !== $scope.verifyPassword){
                    $scope.error = "Both the password and verify password fields should match";
                } else {
                    var newUser = {
                        username: $scope.username,
                        password: $scope.password,
                        email: $scope.email,
                        usertype: $scope.usertype
                    };
                    //console.log(newUser);

                    //UserService.createUser(newUser)
                    //    .then(function(newlyCreatedUser) {
                    //        //console.log(newlyCreatedUser);
                    //
                    //        //update rootscope user
                    //        $rootScope.user = newlyCreatedUser;
                    //
                    //        //Navigate to profile
                    //        $location.path("/profile");
                    //    });
                }
            } else {
                $scope.error = "One of the input fields is missing";
            }
        }
    }
})();