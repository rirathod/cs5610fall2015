/**
 * Created by riddhirathod on 12/7/15.
 */
"use strict";
(function() {
    angular
        .module("HomeworkTrackerApp")
        .controller("ContactUsMessagesController", ContactUsMessagesController);

    function ContactUsMessagesController($scope, $location, ContactUsService) {
        $scope.$location = $location;

        ContactUsService.getMessages()
            .then(function(messages) {
                $scope.messages = messages;
            });
    }
})();