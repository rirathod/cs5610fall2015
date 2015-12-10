"use strict";
(function(){
    angular
        .module("HomeworkTrackerApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo : "/website"
            })
            .when("/website",{
                templateUrl: "views/website/website.view.html"
            })
            .when("/signin",{
                templateUrl: "views/signin/signin.view.html"
            })
            .when("/signup",{
                templateUrl: "views/signup/signup.view.html"
            })
            .when("/contactus",{
                templateUrl: "views/contactus/contactus.view.html"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html"
                // Passportjs
                //resolve    : {
                //    loggedin : checkLoggedin
                //}
            })
            .when("/individualproject",{
                templateUrl: "views/individualproject/individualproject.view.html"
            })
            .when("/teamproject",{
                templateUrl: "views/teamproject/teamproject.view.html"
            })
            .when("/search",{
                templateUrl: "views/search/search.view.html"
            })
            .when("/contactusmessages",{
                templateUrl: "views/contactus/contactusmessages.view.html"
            })
            .when("/user/:userId/project/:projectId/projectField", {
                templateUrl: "views/projectField/projectField.view.html"
            })
            .otherwise({
                redirectTo : "/"
            })
    }
})();

/* Passportjs
var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/api/project/signedin')
        .success(function(user) {
            if (user !== '0') {
                $rootScope.loggedInUser = user;
                deferred.resolve();
            } else {
                $rootScope.errorMessage = 'You need to sign in.';
                deferred.reject();
                $location.url('/signin');
            }
        });
    return deferred.promise;
};
*/