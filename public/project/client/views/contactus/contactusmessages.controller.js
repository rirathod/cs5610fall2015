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

        $scope.search = search;
        function search() {
            ContactUsService.getMessages()
                .then(function(messages) {
                    var searchMessages = [];

                    for(var i=0; i<messages.length; i++) {
                        var flag = false;

                        if (!angular.isUndefined($scope.email) && $scope.email != "") {
                            if(messages[i].email === $scope.email) {
                                flag = true;
                            } else {
                                flag = false;
                                continue;
                            }
                        }

                        if (!angular.isUndefined($scope.keyword) && $scope.keyword != "") {
                            if (messages[i].message.indexOf($scope.keyword) > -1) {
                                flag = true;
                            } else {
                                flag = false;
                                continue;
                            }
                        }

                        if(flag) {
                            searchMessages.push(messages[i]);
                        }
                    }

                    $scope.messages = searchMessages;
                });
        }
    }
})();