"use strict";

var nodemailer = new require("./nodemailer.service.server.js")();

module.exports = function(app, model){
    app.post("/api/project/user", AddUser);
    app.put("/api/project/user/:id", UpdateUser);
    app.get("/api/project/user/:id", FindById);
    app.delete("/api/project/user/:id", DeleteUser);
    app.get('/api/project/user', FindUser);

    function AddUser(req, res){
        //console.log("In user.service.server.js: AddUser");
        //console.log(req.body);
        model
            .Create(req.body)
            .then(function(user) {
                //nodemailer
                //    .sendEmail({"to": user.email})
                //    .then(function(result){
                //        console.log("result of nodemailer: ", result);
                //    });

                res.json(user);
            });
    }

    function FindUser(req, res){
        var username = req.param("username");
        var password = req.param("password");
        var userType = req.param("userType");

        if(typeof username === 'undefined' && typeof password === 'undefined' && typeof userType === 'undefined'){
            model
                .FindAll()
                .then(function(users) {
                    res.json(users);
                });
        }
        else if(username != null && password != null && userType != null){
            var userInfo = {
                username : username,
                password : password,
                userType: userType
            };
            model
                .FindUserByCredentialsAndType(userInfo)
                .then(function(user) {
                    //console.log("In user.service.server.js:");
                    //console.log(user);
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

    function FindById(req, res){
        model
            .FindById(req.params.id)
            .then(function(user) {
                res.json(user);
            });
    }

    function UpdateUser(req, res){
        //console.log(req.params.id);
        //console.log(req.body);

        model
            .Update(req.params.id, req.body)
            .then(function(user) {
                //console.log("In user.service.server.js: UpdateUser");
                //console.log(user);
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