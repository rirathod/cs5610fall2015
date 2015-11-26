"use strict";

module.exports = function(app, model){

    app.post("/api/assignment/user", AddUser);
    app.get("/api/assignment/user/:id", FindById);
    app.put("/api/assignment/user/:id",UpdateUser);
    app.delete("/api/assignment/user/:id", DeleteUser);
    app.get('/api/assignment/user', FindUser);

    function AddUser(req,res){
        res.json(model.Create(req.body));
    }

    function FindUser(req,res){
        var username = req.param("username");
        var password = req.param("password");

        if(typeof username === 'undefined' && typeof password === 'undefined'){
            res.json(model.FindAll());
        }
        else if(username != null && password != null){
            var credentials = {
                username : username,
                password : password
            };
            res.json(model.FindUserByCredentials(credentials));
        }
        else{
            res.json(model.FindUserByUsername(username));
        }
    }

    function FindById(req,res){
        res.json(model.FindById(req.params.id));
    }

    function UpdateUser(req,res){
        res.json(model.Update(req.params.id, req.body));
    }

    function DeleteUser(req, res){
        res.json(model.Delete(req.params.id));
    }
};