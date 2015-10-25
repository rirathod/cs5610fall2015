(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "admin.html"
                //controller: "CourseController"
            })
            .when("/forms", {
                templateUrl: "forms/forms.view.html",
                controller: "FormController"
            })
            .when("/home",{
                templateUrl: "home/home.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "profile/profile.view.html",
                controller: "ProfileController"
            })
            .when("/register", {
                templateUrl: "register/register.view.html",
                controller: "RegisterController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();