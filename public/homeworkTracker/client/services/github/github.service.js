
function searchProjectByTitle($scope, GithubService) {
    var model = this;
    model.search = search;

    function searchProjectByTitle() {
        var deferred = $q.defer();
        var url = "";

        $http.jsonp(url)
            .success(function(response) {
                return deferred.resolve(response);
            })

        return deferred.promise;
    }
}
