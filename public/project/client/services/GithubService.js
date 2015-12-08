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

        // Functions
        function requestJSON(url, callback) {
            $.ajax({
                url: url,
                complete: function(xhr) {
                    callback.call(null, xhr.responseJSON);
                }
            });
        }

        function syncCommits(githubUsername, githubReponame) {
            var defer = $q.defer();
            var requri='https://api.github.com/users/'+ githubUsername;
            var reposuri='https://api.github.com/users/'+ githubUsername + '/repos';
            var gitrepouri = 'https://api.github.com/repos/' + githubUsername + '/' + githubReponame;
            var commitUri='https://api.github.com/repos/'+ githubUsername + '/' + githubReponame + '/commits';

            // check if user exists
            requestJSON(requri, function(json) {
                if (json.message != "Not Found" && githubUsername != '') {
                    console.log("User exists");

                    // EXPERIMENT
                    //console.log("EXPERIMENT");
                    //$.getJSON(gitrepouri, function(response){
                    //    console.log(response);
                    //    $http.get("https://api.github.com/repos/rirathod/cs5610fall2015/collaborators", function(response1){
                    //        console.log(response1);
                    //    });
                    //});

                    // check is repository exists
                    $.getJSON(reposuri, function(repositories){
                        if(repositories.length > 0) {
                            var repoExists = false;
                            $.each(repositories, function(index) {
                                //console.log(repositories[index].name + " " + githubReponame);
                                if(repositories[index].name === githubReponame) {
                                    repoExists = true;
                                }
                            });

                            if(repoExists == true) {
                                console.log("Repository exists");
                                $.getJSON(commitUri)
                                    .success(function(commits){
                                        defer.resolve(commits);
                                    });
                            } else {
                                console.log("Repository does not exist");
                            }
                        } else {
                            console.log("No Repositories");
                        }
                    });
                }
            });

            return defer.promise;
        }
    }
})();