(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService()
    {
        var forms = [];

        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var id = Guid.create();
            var newForm = {userId: id}
            forms.push(newForm);
            return newForm;
        }

        function findAllFormsForUser(userId, callback) {
            var arrayLength = forms.length;
            var userForms = [];
            for (var i = 0; i < arrayLength; i++) {
                if (forms[i].userId == userId) {
                    userForms.push(forms[i]);
                }
            }
            return userForms;
        }

        function deleteFormById(formId, callback) {
            var arrayLength = forms.length;
            for (var i = 0; i < arrayLength; i++) {
                if (forms[i].formId == formId) {
                    forms.splice(i, 1);
                }
            }
            return forms;
        }

        function updateFormById(formId, newForm, callback) {
            var arrayLength = forms.length;
            for (var i = 0; i < arrayLength; i++) {
                if (forms[i].formId == formId) {
                    forms[i] = newForm;
                    return forms[i];
                } else {
                    return null;
                }
            }
        }
    }
})();