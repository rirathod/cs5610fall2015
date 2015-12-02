/**
 * Created by riddhirathod on 11/30/15.
 */
"use strict";
(function () {
    angular
        .module("HomeworkTrackerApp")
        .controller("ProjectFieldController", ProjectFieldController);

    function ProjectFieldController($scope, ProjectFieldService, $rootScope, $location, $routeParams) {
        var userId = $routeParams.userId;
        var projectId = $routeParams.projectId;
        console.log(userId);
        console.log(projectId);

        $scope.projectFieldsOption = [
            { name: "Single Line Text Field", id: 0 },
            { name: "Multi Line Text Field", id: 1 },
            { name: "Date Field", id: 2 },
            { name: "Dropdown Field", id: 3 },
            { name: "CheckBoxes Field", id: 4 },
            { name: "Radio Buttons Field", id: 5 }
        ];

        ProjectFieldService.getFieldsForProject(projectId)
            .then(function(projectFields){
                $scope.projectFields = projectFields;
            });

        $scope.addProjectField = addProjectField;
        $scope.removeProjectField = removeProjectField;
        $scope.cloneProjectField = cloneProjectField;
        $scope.editProjectField = editProjectField;
        $scope.reorderProjectField = reorderProjectField;

        function addProjectField(modelType) {
            var textField = {"label": "New Text Field", "fieldType": "TEXT", "placeholder": "New Field"};
            var textAreaField = {"label": "New Text Field", "fieldType": "TEXTAREA", "placeholder": "New Field"};
            var dateField = {"label": "New Date Field", "fieldType": "DATE"};

            var dropDownField = {"label": "New Dropdown", "fieldType": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            var checkBoxField = {"label": "New Checkboxes", "fieldType": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            var radioBoxField = {"label": "New Radio Buttons", "fieldType": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            var projectField;
            if(modelType === "Single Line Text Field"){
                projectField = textField;
            } else if(modelType === "Multi Line Text Field"){
                projectField = textAreaField;
            } else if(modelType === "Date Field"){
                projectField = dateField;
            } else if(modelType === "Dropdown Field"){
                projectField = dropDownField;
            } else if(modelType === "CheckBoxes Field"){
                projectField = checkBoxField;
            } else if(modelType === "Radio Buttons Field"){
                projectField = radioBoxField;
            }

            console.log(projectField);
            if(!(typeof projectField === "undefined")) {
                ProjectFieldService.createFieldForProject(projectId, projectField)
                    .then(function(projectFields) {
                        $scope.projectFields = projectFields;
                    });
            }
        }

        function removeProjectField(projectField){
            ProjectFieldService.deleteFieldFromForm(projectId, projectField._id)
                .then(function(projectFields){
                    $scope.projectFields = projectFields;
                });
        }

        function cloneProjectField(projectField){
            var fieldType = projectField.fieldType;
            var modelType;
            if(fieldType === "TEXT"){
                modelType = "Single Line Text Field";
            } else if(fieldType === "TEXTAREA"){
                modelType = "Multi Line Text Field";
            } else if(fieldType === "DATE"){
                modelType = "Date Field";
            } else if(fieldType === "OPTIONS"){
                modelType = "Dropdown Field";
            } else if(fieldType === "CHECKBOXES"){
                modelType = "CheckBoxes Field";
            } else if(fieldType === "RADIOS"){
                modelType = "Radio Buttons Field";
            }

            addProjectField(modelType);
            //FieldService.cloneField(formId, field)
            //    .then(function(fields){
            //        $scope.fields = fields;
            //    });
        }

        function editProjectField(projectField) {
            //FieldService.updateField(formId, field._id, field)
            //    .then(function(fields) {
            //        $scope.fields = fields;
            //    });
        }

        function reorderProjectField(projectField) {

        }
    }
})();