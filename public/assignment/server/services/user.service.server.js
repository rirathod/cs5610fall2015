"use strict";

module.exports = function(app, userModel, db){
    app.post("/api/assignment/user", createNewUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/id/:id", getUserById);
    app.get("/api/assignment/user?username=:username", getUserByUsername);
    app.get("/api/assignment/user?username=:username&password=:password", getUserByUsernameAndPassword);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createNewUser(req, res){
        var user = req.body;
        userModel.createUser(user)
            .then(function(newUser){
                res.json(newUser);
            })
            .catch(function(error){
                console.log('createNewUser error in user.service.server.js', JSON.stringify(error));
                res.status(400).send(JSON.stringify(error));
            });
    }

    function getAllUsers(req, res){
        var query = req.query || {};

        userModel.findAllUsers()
            .then(function(users){
                res.json(users);
            })
            .catch(function(error){
                console.log('getAllUsers error in user.service.server.js', JSON.stringify(error));
                res.status(400).send(JSON.stringify(error));
            });
    }

    function getUserById(req, res){
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(function(user){
                res.json(user);
            })
            .catch(function(error){
                console.log('getUserById error in user.service.server.js', JSON.stringify(error));
                res.status(400).send(JSON.stringify(error));
            });
    }

    function getUserByUsername(req, res){
        var username = req.params.username;
        if (!username){
            res.status(400).send("Username not provided");
        } else {
            userModel.findUserByUsername(username)
                .then(function(user){
                    res.json(user);
                })
                .catch(function(error){
                    console.log('getUserByUsername error in user.service.server.js', JSON.stringify(error));
                    res.status(400).send(JSON.stringify(error));
                });
        }
    }

    function getUserByUsernameAndPassword(req, res){
        var username = req.params.username;
        var password = req.params.password;

        if (!username){
            res.status(400).send("Username not provided");
        } else if(!password){
            res.status(400).send("Password not provided");
        } else {
            var credentials = {
                "username" : username,
                "password" : password
            };
            userModel.findUserByCredentials(credentials)
                .then(function(user){
                    res.json(user);
                })
                .catch(function(error){
                    console.log('getUserByUsernameAndPassword error in user.service.server.js', JSON.stringify(error));
                    res.status(400).send(JSON.stringify(error));
                });
        }
    }

    function updateUserById(req, res){
        var updatedUser = req.body || {};
        var userId = req.params.id || "";

        userModel.updateUser(userId, updatedUser)
            .then(function(userAfterUpdate){
                res.json(userAfterUpdate);
            })
            .catch(function(error){
                console.log('create user error', JSON.stringify(error));
                res.status(400).send(JSON.stringify(error));
            });
    }

    function deleteUserById(req, res){
        var userId = req.params.id;

        userModel.deleteUserById(userId)
            .then(function(users){
                res.json(users);
            })
            .catch(function(error){
                console.log('deleteUserById error in user.service.server.js', JSON.stringify(error));
                res.status(400).send(JSON.stringify(error));
            });
    }
};