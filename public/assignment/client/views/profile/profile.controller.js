(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ['$scope', '$location', '$rootScope', 'UserService', ProfileController]);

    function ProfileController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        //listen for login/sigin to grab logged in user
        $rootScope.$on("auth", function(event, user){
            $scope.user = $rootScope.user = user;
        });

        $scope.update = function () {
            $scope.error = null;
            $scope.success = null;
            UserService.updateUser($scope.user.id, $scope.user)
                .then(function(updatedUser){
                    $scope.user = updatedUser;
                    $scope.success = "User Profile updated successfully.";
                })
                .catch(function(error){
                    $scope.error = error;
                })

            /*UserService.updateUser(user.id, user, function(object) {
                console.log(object);
                if (typeof object === 'string' || object instanceof String) {
                    $scope.message = object;
                } else {
                    $scope.message = "User Profile updated successfully."
                }
            });*/
        };
    };
})();