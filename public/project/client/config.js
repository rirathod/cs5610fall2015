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
                //controller: "SignInController"
            })
            .when("/signup",{
                templateUrl: "views/signup/signup.view.html"
                //controller: "SignUpController"
            })
            .when("/contactus",{
                templateUrl: "views/contactus/contactus.view.html"
            })
            //.when("/studenthome",{
            //    templateUrl: "views/studenthome/studenthome.view.html"
            //})
            //.when("/instructorhome",{
            //    templateUrl: "views/instructorhome/instructorhome.view.html"
            //})
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html"
                //controller: "ProfileController"
            })
            .when("/individualproject",{
                templateUrl: "views/individualproject/individualproject.view.html"
            })
            .when("/teamproject",{
                templateUrl: "views/teamproject/teamproject.view.html"
            })
            //.when("/form", {
            //    templateUrl: "views/form/form.view.html"
            //    //controller: "FormController"
            //})
            //.when("/admin", {
            //    templateUrl: "views/admin/admin.view.html"
            //    //controller: "AdminController"
            //})
            //.when("/user", {
            //    templateUrl : "/assignment/client/field/field.view.html"
            //})
            .when("/user/:userId/project/:projectId/projectField", {
                templateUrl: "views/projectField/projectField.view.html"
            })
            .otherwise({
                redirectTo : "/"
            })
    }
})();