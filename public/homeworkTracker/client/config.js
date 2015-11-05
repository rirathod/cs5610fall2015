(function(){
    angular
        .module("HomeworkTrackerApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/admin", {
                templateUrl: "admin/admin.view.html",
                controller: "AdminController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();