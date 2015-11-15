module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsByUserId(req, res) {
        var userId = req.params["userId"];
        model
            .findFormsByUserId(userId)
            .then(function(forms){
                res.json(forms);
            });
    }

    function getFormById(req, res) {
        var formId = req.params["formId"];
        model
            .findFormsByUserId(formId)
            .then(function(form){
                res.json(form);
            });
    }

    function deleteFormById(req, res) {
        var formId = req.params["formId"];
        model
            .deleteFormById(formId)
            .then(function(form){
                res.json(form);
            });
    }

    function createFormByUserId(req, res) {

    }

    function updateFormById(req, res) {

    }
};