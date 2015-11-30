/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("SignInController", SignInController);
        //.controller("SignInController", ['$scope', '$location', SignInController]);

    function SignInController($scope, $location) {
        $scope.$location = $location;

        $scope.signin = signin;

        function signin(user) {
            var username = user.username;
            var password = user.password;
            var userType = user.usertype;

            console.log(username);
            console.log(password);
            console.log(userType);
            //UserService.findUserByUsernameAndPassword(username, password)
            //    .then(function(currentUser) {
            //        if(currentUser != null) {
            //            $rootScope.user = currentUser;
            //            $location.path("/profile");
            //            $scope.message = "User logged in successfully";
            //        } else {
            //            $scope.message = "Username/Password combination does not exist";
            //        }
            //    });
        }
    }
})();