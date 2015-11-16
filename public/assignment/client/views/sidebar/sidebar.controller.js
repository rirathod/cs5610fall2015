"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", ['$scope', '$location', SidebarController]);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }
})();