/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("SignUpController", SignUpController);

    function SignUpController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;

        $scope.signup = signup;

        function signup() {
            if($scope.username && $scope.password && $scope.verifyPassword && $scope.email && $scope.usertype) {
                if ($scope.password !== $scope.verifyPassword){
                    $scope.error = "Both the password and verify password fields should match";
                } else {
                    var newUser = {
                        username: $scope.username,
                        password: $scope.password,
                        email: $scope.email,
                        userType: $scope.usertype
                    };
                    //console.log(newUser);

                    UserService.createUser(newUser)
                        .then(function(newlyCreatedUser) {
                            //update rootscope loggedInUser
                            $rootScope.loggedInUser = newlyCreatedUser;

                            //Navigate to user profile page
                            $location.path("/profile");

                        });
                }
            } else {
                $scope.error = "One of the input fields is missing";
            }
        }
    }
})();