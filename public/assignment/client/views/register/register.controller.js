(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location,$rootScope, UserService) {
        $scope.register = register;

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        function register(user) {
            var newUser = {
                id: guid(),
                username: user.username,
                password: user.password,
                firstname: "",
                lastname: "",
                email: user.email
            };

            UserService.createUser(newUser, function(user) {
                console.log(user);
            });

            $rootScope.user = newUser;
            $location.path("/profile");
        }
    }
})();