/**
 * Created by riddhirathod on 12/8/15.
 */
'use strict';
(function(){
    angular
        .module("CarouselExampleApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        $scope.$location = $location;
        $scope.user = $rootScope.loggedInUser;
    }
})();