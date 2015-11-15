var q = require("q");
var forms = require("./form.mock.json");

module.exports = function(app){
    var api = {
        createFormByUserId: createFormByUserId,
        findAllForms: findAllForms,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById
    };
    return api;

    function createFormByUserId(userId) {

    }

    function findAllForms() {
        return forms;
    }

    function findFormById(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].formId == formId) {
                return forms[i];
            }
        }
        return null;
    }

    function findFormByTitle(formTitle) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == formTitle) {
                return forms[i];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        return forms;
    }

    function updateFormById(formId) {

    }

    function deleteFormById(formId) {

    }
};
