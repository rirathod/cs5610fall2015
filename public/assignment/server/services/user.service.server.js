module.exports = function(app, model) {
    app.post("/api/assignment/user", createNewUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=:username", getUserByName);
    app.get("/api/assignment/user?username=:username&password=:password", getUserByNameAndPassword);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createNewUser(req, res) {
        var user = req.body;
        model
            .createUser(user)
            .then(function(users){
                res.json(users);
            });
    }

    function getAllUsers(req, res) {
        model
            .findAllUsers()
            .then(function(users){
                res.json(users);
            });
    }

    function getUserById(req, res) {
        var id = req.params["id"];
        model
            .findUserById(id)
            .then(function(user){
                res.json(user);
            });
    }

    function getUserByName(req, res) {
        var username = req.params["username"];
        model
            .findUserByUsername(username)
            .then(function(user){
                res.json(user);
            });
    }

    function getUserByNameAndPassword(req, res) {
        var username = req.params["username"];
        var password = req.params["password"];
        model
            .findUserByCredentials(username, password)
            .then(function(user){
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        var id = req.params["id"];
        var user = req.body;
        model
            .updateUserById(id, user)
            .then(function(users){
                res.json(users);
            });
    }

    function deleteUserById(req, res) {
        var id = req.params["id"];
        model
            .deleteUserById(id)
            .then(function(users){
                res.json(users);
            });
    }
};
