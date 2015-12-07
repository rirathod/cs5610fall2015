/**
 * Created by riddhirathod on 10/28/15.
 */
"use strict";
(function() {
    angular
        .module("HomeworkTrackerApp")
        .controller("ContactUsController", ContactUsController);

    function ContactUsController($scope, $location, ContactUsService) {
        $scope.$location = $location;

        $scope.reset = reset;
        $scope.enter = enter;

        function reset() {
            $scope.email = "";
            $scope.message = "";
        }

        function enter() {
            if($scope.email && $scope.message) {
                console.log($scope.email);
                console.log($scope.message);
                var messageObj = {
                    "email": $scope.email,
                    "message": $scope.message
                };
                ContactUsService.addMessage(messageObj)
                    .then(function(result) {
                        console.log(result);
                        $scope.success = "Message submitted";
                    });
            } else {
                $scope.error = "One of the input fields is missing";
            }
        }
    }
})();