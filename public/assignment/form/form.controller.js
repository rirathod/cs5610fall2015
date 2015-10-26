(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService) {
        $scope.user = $rootScope.user;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //$scope.forms = initializeForms($scope.user);
        var initializeForms = function() {
            FormService.findAllFormsForUser($scope.user.id, function(userForms){
                $scope.forms = userForms;
            });
        };
        initializeForms();

        function addForm(form) {
            var newForm = {
                name : form.name
            };

            FormService.createFormForUser($rootScope.user.id, newForm, function(object) {
                $scope.forms.push(object);
            })
        }

        function updateForm(newForm) {
            var form = $scope.forms[$scope.selectedFormIndex];
            FormService.updateFormById(form.formid, newForm, function(object) {
                console.log(object);
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index].formid, function(newForms) {
                $scope.forms = newForms;
            });
        }

        function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.form = {
                formid: $scope.forms[index].formid,
                userid: $scope.forms[index].userid,
                name: $scope.forms[index].name
            };
        }
    }
})();