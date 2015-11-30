/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("InstructorHomeController", InstructorHomeController);

    function InstructorHomeController($scope, $location, $rootScope) {
        $scope.$location = $location;
    }
})();