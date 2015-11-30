/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function() {
    angular
        .module("HomeworkTrackerApp")
        .controller("ContactUsController", ContactUsController);
        //.controller("ContactUsController", ['$scope', '$location', ContactUsController]);

    function ContactUsController($scope, $location) {
        $scope.$location = $location;

        $scope.reset = reset;
        $scope.enter = enter;

        function reset() {
            if($scope.email && $scope.message) {
                $scope.email = "";
                $scope.message = "";
            } else {
                $scope.error = "One of the input fields is missing";
            }
        }

        function enter() {
            if($scope.email && $scope.message) {
                console.log($scope.email);
                console.log($scope.message);
            } else {
                $scope.error = "One of the input fields is missing";
            }
        }
    }
})();