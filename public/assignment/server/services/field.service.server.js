module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", getFormFieldsById);
    app.get("/api/assignment/form/:formId/field/:fieldId", getAllUsers);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldByID);
    app.post("/api/assignment/form/:formId/field", createNewFormFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);

    function getFormFieldsById(req, res) {

    }

    function getAllUsers(req, res) {

    }

    function deleteFormFieldByID(req, res) {

    }

    function createNewFormFieldById(req, res) {

    }

    function updateFormFieldById(req, res) {

    }
};