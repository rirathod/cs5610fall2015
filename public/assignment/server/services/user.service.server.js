"use strict";

module.exports = function(app, model){

    app.post("/api/assignment/user", AddUser);
    app.put("/api/assignment/user/:id", UpdateUser);
    app.get("/api/assignment/user/:id", FindById);
    app.delete("/api/assignment/user/:id", DeleteUser);
    app.get('/api/assignment/user', FindUser);

    function AddUser(req,res){
        model
            .Create(req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function FindUser(req,res){
        var username = req.param("username");
        var password = req.param("password");

        if(typeof username === 'undefined' && typeof password === 'undefined'){
            model
                .FindAll()
                .then(function(users) {
                    res.json(users);
                });
        }
        else if(username != null && password != null){
            var credentials = {
                username : username,
                password : password
            };
            model
                .FindUserByCredentials(credentials)
                .then(function(user) {
                    res.json(user);
                });
        }
        else{
            model
                .FindUserByUsername(username)
                .then(function(user) {
                    res.json(user);
                });
        }
    }

    function FindById(req,res){
        model
            .FindById(req.params.id)
            .then(function(user) {
                res.json(user);
            });
    }

    function UpdateUser(req,res){
        model
            .Update(req.params.id, req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function DeleteUser(req, res){
        model
            .Delete(req.params.id)
            .then(function(status) {
                res.json(status);
            });
    }
};