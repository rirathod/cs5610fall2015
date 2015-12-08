/**
 * Created by riddhirathod on 12/8/15.
 */
"use strict";
(function(){
    angular
        .module("CarouselExampleApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo : "/home"
            })
            .when("/home",{
                templateUrl: "home.view.html"
            })
            .otherwise({
                redirectTo : "/"
            })
    }
})();