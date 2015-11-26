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

        UserService.findUserByUsername("user1")
            .then(function(user){
                console.log("findUserByUsername:");
                console.log(user);
            });

        UserService.findUserByUsernameAndPassword("user1", "user1")
            .then(function(user){
                console.log("findUserByUsernameAndPassword:");
                console.log(user);
            });

        UserService.findAllUsers()
            .then(function(users) {
                console.log("findAllUsers:");
                console.log(users);
            });

        UserService.deleteUserById("565773abe4a62fa69fa74c9f")
            .then(function(response) {
                console.log("deleteUserById:");
                console.log(response);
            });

        UserService.findAllUsers()
            .then(function(users) {
                console.log("findAllUsers:");
                console.log(users);
            });

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