"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo : "/home"
            })
            .when("/home",{
                templateUrl: "views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                //controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html",
                //controller: "RegisterController"
            })
            .when("/profile", {
                    templateUrl: "views/profile/profile.view.html",
                //controller: "ProfileController"
            })
            .when("/form", {
                templateUrl: "views/form/form.view.html",
                //controller: "FormController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                //controller: "AdminController"
            })
            //.when("/user", {
            //    templateUrl : "/assignment/client/field/field.view.html"
            //})
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/field/field.view.html",
            })
            .otherwise({
                redirectTo : "/"
            })
    }
})();