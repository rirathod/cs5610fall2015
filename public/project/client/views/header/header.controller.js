/**
 * Created by riddhirathod on 10/28/15.
 */

'use strict';
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.user = $rootScope.loggedInUser;

        $scope.logout = function(){
            $scope.user = $rootScope.loggedInUser = null;
            $location.path("/signin");
        };

        /* Passportjs
        $scope.signout = signout;
        function signout() {
            UserService.signout(function()
            {
                $rootScope.currentUser = null;
                $location.url("/home");
            });
        }
        */
    }
})();