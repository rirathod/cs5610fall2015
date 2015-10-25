(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location) {
        $scope.register = register;
        function register() {

        }
    }
})();