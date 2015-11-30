/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("SignUpController", ['$scope', '$location', SignUpController]);

    function SignUpController($scope, $location) {
        $scope.$location = $location;
    }
})();