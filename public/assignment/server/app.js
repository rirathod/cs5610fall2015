module.exports = function(app) {
    var model1 = require("./models/user.model.js")(app);
    require("./services/user.service.server.js")(app, model1);

    var model2 = require("./models/form.model.js")(app);
    require("./services/form.service.server.js")(app, model2);
    require("./services/field.service.server.js")(app, model2);
};