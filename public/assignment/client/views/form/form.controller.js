"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location) {
        console.log($rootScope.user);
        FormService.findAllFormsForUser($rootScope.user.id)
            .then(function (forms) {
                $scope.forms = forms;
            });

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.navigate = navigate;

        function addForm() {
            //console.log($scope.formName);
            var form = {
                title: $scope.formName
            };
            consolge.log(form);

            //console.log(angular.isUndefined($scope.formName));
            if(!angular.isUndefined($scope.formName) && $scope.formName != ""){
                FormService.createFormForUser($rootScope.user.id, form)
                    .then(function(forms) {
                        FormService.findAllFormsForUser($rootScope.user.id)
                            .then(function(forms) {
                                $scope.forms = forms;
                                $scope.formName = "";
                            });
                    });
            }
        }

        function deleteForm(formId) {
            FormService.deleteFormById(formId)
                .then(function (forms) {
                    FormService.findAllFormsForUser($rootScope.user.id)
                        .then(function (forms) {
                            $scope.forms = forms;
                        });
                });
        }

        function selectForm(index) {
            //console.log(index);
            $scope.selectedFormId = $scope.forms[index].id;
            $scope.formName = $scope.forms[index].title;
            $scope.index = index;
        }

        function updateForm(selectedFormId, index) {
            if (!angular.isUndefined(index)) {
                //console.log(index);
                if (!angular.isUndefined($scope.formName) && $scope.formName != "") {
                    var formToBeUpdated = $scope.forms[index];
                    var newForm = {
                        title: $scope.formName,
                        userId: $rootScope.user.id
                    };
                    console.log(newForm);
                    FormService.updateFormById(selectedFormId, newForm).then(function (updatedForm) {
                        $scope.forms[index] = updatedForm;
                        $scope.formName = "";
                    })
                }
            }
        }

        function navigate(index){
            var target = "/user/" + $rootScope.user.id + "/form/" + $scope.forms[index].id + "/fields";
            console.log(target);
            $location.path(target);
        }
    }
})();