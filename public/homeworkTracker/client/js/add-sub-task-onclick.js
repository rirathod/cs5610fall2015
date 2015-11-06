(function()
{
    $(init);

    function init()
    {
        var template = $(".template").clone();
        var tbody = $(".template-container");
        tbody.empty();

        // click event handler
        $('#addSubTask').click(function(){
            var subTaskDescription = $("#subTaskDescription").val();
            $('#subTaskDescription').val('');

            //console.log(subTaskDescription);
            addSubTaskOnClick(subTaskDescription);
        });

        function addSubTaskOnClick(subTaskDescription) {
            var instance = template.clone();
            instance
                .find('.description')
                .html(subTaskDescription);
            tbody.append(instance);
            alert("Sub-task added!");

            $("#subTaskDescription").empty();
        }
    }
})();