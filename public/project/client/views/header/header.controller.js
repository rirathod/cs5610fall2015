/**
 * Created by riddhirathod on 10/28/15.
 */

'use strict';
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        $scope.$location = $location;
        $scope.user = $rootScope.loggedInUser;

        $scope.logout = function(){
            $scope.user = $rootScope.loggedInUser = null;
            $location.path("/signin");
        };
    }
})();