
//function searchProjectByTitle($scope, GithubService) {
//    var model = this;
//    model.search = search;
//
//    function searchProjectByTitle() {
//        var deferred = $q.defer();
//        var url = "";
//
//        $http.jsonp(url)
//            .success(function(response) {
//                return deferred.resolve(response);
//            })
//
//        return deferred.promise;
//    }
//}


"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .factory("GithubService", GithubService);

    function GithubService($q, $http) {
        var service = {
            syncCommits: syncCommits
        };
        return service;

        function syncCommits(githubUsername, githubReponame) {
            var defer = $q.defer();

            //var requri   = 'https://api.github.com/users/'+username;
            //var repouri  = 'https://api.github.com/users/'+username+'/repos';
            var commitUri = 'https://api.github.com/repos/'+ githubUsername + '/' + githubReponame + '/commits';
            console.log(commitUri);

            $.getJSON(commitUri)
                .success(function(commits){
                    defer.resolve(commits);
                });
            return defer.promise;
        }
    }
})();