'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;

        $scope.username = $rootScope.user.username;
        $scope.password = $rootScope.user.password;
        $scope.email = $rootScope.user.email;

        $scope.update = function () {
            var user = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                id: $rootScope.user._id
            };

            UserService.updateUser(user, user.id)
                .then(function(updatedUser){
                    $scope.user = updatedUser;
                    $rootScope.user = updatedUser;
                    $scope.success = "User Profile updated successfully.";
                })
                .catch(function(error){
                    $scope.error = error;
                })
        };
    }
})();