"use strict";

module.exports = function(app, mongoose, db) {

    var userModel = require("./models/user.model.js")(mongoose, db);
    require("./services/user.service.server.js")(app, userModel);

    var projectModel = require("./models/project.model.js")(mongoose, db);
    require("./services/project.service.server.js")(app, projectModel);
    require("./services/projectField.service.server.js")(app, projectModel);
};