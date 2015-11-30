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
                templateUrl: "views/signup/signup.view.html"
            })
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html"
                //controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html"
                //controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html"
                //controller: "ProfileController"
            })
            .when("/form", {
                templateUrl: "views/form/form.view.html"
                //controller: "FormController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
                //controller: "AdminController"
            })
            //.when("/user", {
            //    templateUrl : "/assignment/client/field/field.view.html"
            //})
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/field/field.view.html"
            })
            .otherwise({
                redirectTo : "/"
            })
    }
})();