/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("StudentHomeController", StudentHomeController);

    function StudentHomeController($scope, $location, $rootScope) {
        $scope.$location = $location;
    }
})();