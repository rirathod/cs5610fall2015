(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", ['$scope', '$location', '$rootScope', '$q', 'UserService', RegisterController]);

    function RegisterController($scope, $location, $rootScope, $q, UserService) {
        $scope.register = register;

        function register(user) {
            $scope.error = null;

            //UserService.findAllUsers()
            //    .then(function(users) {
            //        console.log(users);
            //    })
            //    .error(function(error) {
            //        console.log(error);
            //    });

            if($scope.username, $scope.password, $scope.verifyPassword, $scope.email) {
                if ($scope.password !== $scope.verifyPassword){
                    $scope.error = "Both the password and verify password fields should match";
                } else {
                    var newUser = {
                        username: $scope.username,
                        password: $scope.password,
                        email: $scope.email
                    };
                    UserService.createUser(newUser)
                        .then(function(newlyCreatedUser) {
                            //update rootscope user
                            $rootScope.user = newlyCreatedUser;

                            //Navigate to profile
                            $location.path("/profile");
                        })
                        .catch(function(error){
                            $scope.error = error;
                        });
                }
            }
        }
    }
})();