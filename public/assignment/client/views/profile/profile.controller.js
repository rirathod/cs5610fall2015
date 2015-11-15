(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.user = $rootScope.user;

        $scope.update = update;
        function update(user) {
            UserService.updateUser(user.id, user, function(object) {
                console.log(object);
                if (typeof object === 'string' || object instanceof String) {
                    $scope.message = object;
                } else {
                    $scope.message = "User Profile updated successfully."
                }
            });
        }
    }
})();