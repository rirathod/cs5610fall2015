"use strict";

module.exports = function(app, mongoose, db) {

    var userModel = require("./models/user.model.js")(mongoose, db);
    require("./services/user.service.server.js")(app, userModel);

    var projectModel = require("./models/project.model.js")(mongoose, db);
    require("./services/project.service.server.js")(app, projectModel);
    require("./services/projectSubTask.service.server.js")(app, projectModel);
    require("./services/instructor.service.server.js")(app, projectModel);
    require("./services/projectComment.service.server.js")(app, projectModel);

    var contactUsModel = require("./models/contactUs.model.js")(mongoose, db);
    require("./services/contactus.service.server.js")(app, contactUsModel);

    var teamprojectModel = require("./models/teamproject.model.js")(mongoose, db);
    require("./services/teamproject.service.server.js")(app, teamprojectModel);
};