"use strict";

//var nodemailer = new require("./nodemailer.service.server.js")();

module.exports = function(app, model, passport, LocalStrategy){
    /* Passportjs
    passport.use(new LocalStrategy(
        function(username, password, done) {
            model
                .FindUserByCredentials({username: username, password: password})
                .then(function(user) {
                    if (!user) {
                        return done(null, false);
                    } else {
                        return done(null, user);
                    }
                }, function(err){
                    return done(err);
                });
        }));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        model
            .FindById(user._id)
            .then(function(err, user) {
                done(err, user);
            })
    });

    var auth = function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    app.post("/api/project/user", AddUser);
    app.post("/api/project/user", auth, AddUser);
    app.put("/api/project/user/:id", auth, UpdateUser);
    app.get("/api/project/user/:id", auth, FindById);
    app.delete("/api/project/user/:id", auth, DeleteUser);
    app.get('/api/project/user', auth, FindUser);

    app.post("/api/project/signin", passport.authenticate('local'), Signin);
    app.get('/api/project/signedin', SignedIn);
    app.post("/api/project/signout", Signout);

    function Signin(req, res) {
        console.log("In user.service.server.js");
        var user = req.body;
        model.
            FindUserByCredentialsAndType({username: user.username, password: user.password, userType: user.userType})
            .then(function(foundUser) {
                res.json(foundUser);
            });
    }

    function SignedIn(req, res) {
        console.log("In user.service.server.js: SignedIn");
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function Signout(req, res) {
        req.logOut();
        res.send(200);
    }
    */

    app.post("/api/project/user", AddUser);
    app.put("/api/project/user/:id", UpdateUser);
    app.get("/api/project/user/:id", FindById);
    app.delete("/api/project/user/:id", DeleteUser);
    app.get('/api/project/user', FindUser);

    function AddUser(req, res){
        model
            .Create(req.body)
            .then(function(user) {
                //nodemailer
                //    .sendMail({"to": user.email})
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