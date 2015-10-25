(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.login = login;
        function login() {
            var username = $scope.username;
            var password = $scope.password;
            var user = UserService.findUserByUsernameAndPassword(username, password);
            if(user != null) {
                $rootScope
            }
        }
    }
})();