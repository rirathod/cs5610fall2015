/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("FooterController", FooterController);

    function FooterController($scope, $location) {
        $scope.$location = $location;
    }
})();