$(document).ready(function() {

    function alertinput () {
    var groceries = $(this).attr('ingred-list');
        console.log(groceries);
    };
    
    var ingredients = ['bread', 'peanut butter', 'jam'];

        function renderButtons() {
            $('#ingredients-btn').empty();

            for (var i = 0; i < ingredients.length; i++) {
                var newBtn = $('<button>');
                newBtn.addClass('ingredButtons');
                newBtn.attr('ingred-list', ingredients[i]);
                newBtn.text(ingredients[i]);
                $('#ingredients-btn').append(newBtn);
            };
        };
    
    $('#add-ingredients-btn').on('click', function(event){
        event.preventDefault();
        var ingredient = $('#ingredients-input').val().trim();
        ingredients.push(ingredient);
        renderButtons();
    });
    
    $(document).on('click', '.ingredButtons', alertinput);
        renderButtons();
    });