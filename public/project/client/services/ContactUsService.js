"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("ContactUsService", ContactUsService);

    function ContactUsService($q, $http) {
        var service = {
            addMessage: addMessage
        };
        return service;

        // Functions
        function addMessage(messageObj) {
            var defer = $q.defer();
            var url = "/api/project/contactus";
            //console.log(url);
            $http.post(url, messageObj)
                .success(function(response){
                    defer.resolve(response);
                });

            return defer.promise;
        }
    }
})();