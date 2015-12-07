"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("ContactService", ContactService);

    function ContactService($q, $http) {
        var service = {
            addMessage: addMessage
        };
        return service;

        // Functions
        function addMessage(messageObj) {
            var defer = $q.defer();
            var url = "/api/project/contactus";
            console.log(url);
            $http.post(url, messageObj)
                .success(function(response){
                    defer.resolve(statusMessage);
                });

            return defer.promise;
        }
    }
})();