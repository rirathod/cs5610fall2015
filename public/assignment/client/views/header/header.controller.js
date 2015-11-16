'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;

        $scope.logout = function(){
            $scope.user = $rootScope.user = null;
            $location.path("/login");
        };
    }
})();