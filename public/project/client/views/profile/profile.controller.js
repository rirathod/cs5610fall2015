/**
 * Created by riddhirathod on 10/28/15.
 */

"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;

        $scope.username = $rootScope.loggedInUser.username;
        $scope.password = $rootScope.loggedInUser.password;
        $scope.email = $rootScope.loggedInUser.email;

        $scope.update = update;

        function update() {
            var user = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email,
                firstName: $scope.firstname,
                lastName: $scope.lastname,
                universityName: $scope.universityName,
                id: $rootScope.loggedInUser._id
            };

            UserService.updateUser(user, user.id)
                .then(function (updatedUser) {
                    $scope.user = updatedUser;
                    $rootScope.loggedInUser = updatedUser;
                    $scope.message = "User Profile updated successfully.";
                })
                .catch(function (error) {
                    $scope.message = error;
                })
        }
    }
})();