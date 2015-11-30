/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .controller("SignInController", ['$scope', '$location', SignInController]);

    function SignInController($scope, $location) {
        $scope.$location = $location;
    }
})();