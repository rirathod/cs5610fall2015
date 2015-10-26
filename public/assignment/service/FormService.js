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

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        function createFormForUser(userId, form, callback) {
            var newForm = {
                formid: guid(),
                userid: userId,
                name: form.name
            };

            forms.push(newForm);
            console.log("In create Form For User");
            console.log(forms);
            return callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var arrayLength = forms.length;
            var userForms = [];
            forms.forEach(function(form, index){
                if (form.userid === userId){
                    userForms.push(form);
                }
            });
            return callback(userForms);
        }

        function deleteFormById(formId, callback) {
            var arrayLength = forms.length;
            var userid;
            for (var i = 0; i < arrayLength; i++) {
                if (forms[i] && forms[i].formid == formId) {
                    userid = forms[i].userid;
                    forms.splice(i, 1);
                }
            }

            //var userForms = [];
            //for (var i = 0; i < arrayLength; i++) {
            //    if (forms[i].userid == userid) {
            //        userForms.push(forms[i]);
            //    }
            //}

            console.log(forms);
            return callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var arrayLength = forms.length;
            for (var i = 0; i < arrayLength; i++) {
                if (forms[i].formid == formId) {
                    forms[i].userid = newForm.userid;
                    forms[i].name = newForm.name;
                    return callback(forms[i]);
                }
            }
            return callback("Form to update not found!!");
        }
    }
})();