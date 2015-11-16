'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login(user) {
            var username = user.username;
            var password = user.password;
            UserService.findUserByUsernameAndPassword(username, password)
                .then(function(currentUser) {
                    if(currentUser != null) {
                        $rootScope.user = currentUser;
                        $location.path("/profile");
                        $scope.message = "User logged in successfully";
                    } else {
                        $scope.message = "Username/Password combination does not exist";
                    }
                });
        }
    }
})();