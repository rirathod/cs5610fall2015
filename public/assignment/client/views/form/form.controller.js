"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location) {
        FormService.findAllFormsForUser($rootScope.user._id)
            .then(function (forms) {
                $scope.forms = forms;
            });

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.navigate = navigate;

        function addForm() {
            var form = {
                title: $scope.formName
            };

            //console.log(angular.isUndefined($scope.formName));
            if(!angular.isUndefined($scope.formName) && $scope.formName != ""){
                FormService.createFormForUser($rootScope.user._id, form)
                    .then(function(createdForm) {
                        FormService.findAllFormsForUser($rootScope.user._id)
                            .then(function(forms) {
                                $scope.forms = forms;
                                $scope.formName = "";
                            });
                    });
            }
        }

        function deleteForm(formId) {
            console.log(formId);
            FormService.deleteFormById(formId)
                .then(function(forms) {
                    FormService.findAllFormsForUser($rootScope.user._id)
                        .then(function (forms) {
                            $scope.forms = forms;
                        });
                });
        }

        function selectForm(index) {
            $scope.selectedFormId = $scope.forms[index]._id;
            $scope.formName = $scope.forms[index].title;
            $scope.index = index;
        }

        function updateForm(selectedFormId, index) {
            if (!angular.isUndefined(index)) {
                if (!angular.isUndefined($scope.formName) && $scope.formName != "") {
                    //var formToBeUpdated = $scope.forms[index];
                    var newForm = {
                        title: $scope.formName,
                        userId: $rootScope.user._id
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
            var target = "/user/" + $rootScope.user._id + "/form/" + $scope.forms[index]._id + "/fields";
            console.log(target);
            $location.path(target);
        }
    }
})();