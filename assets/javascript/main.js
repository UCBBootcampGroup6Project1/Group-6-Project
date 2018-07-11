// Makes a 'GET' request to the API and returns data through an XMLHttpRequest
function searchRecipe(){

    // Request object.
    var xhr = new XMLHttpRequest();
    // Initialize/reinitialize existing 'GET' request to the API.
    xhr.open('GET', "https://api.edamam.com/search?q=chicken&app_id=7919900d&app_key=47fe0acea0eb3f17386dadb3b722e233", true);
    // .withCredentials takes a boolean. Indicates that 'cross-site' requests should be made with credentials/cookies.
    xhr.withCredentials = true;
    // .onload triggers when request is complete.
    xhr.onload = function () {
        // Logs response to console in json format.
        console.log(xhr.responseText);
    };
    // Sends the request.
    xhr.send();
}

// Makes a 'GET' request to the API and returns data through an XMLHttpRequest.
function getNutrition() {

    // Request object.
    var xhr = new XMLHttpRequest();
    // Initialize/Reinitialize existing 'GET' request to the API.
    xhr.open('GET', "", true);
    // Make requests with cookies/credentials
    xhr.withCredentials = true;
    // When request is complete logs the response.
    xhr.onload = function () {
        console.log(xhr.responseText);
    };
    // Send request.
    xhr.send();
}

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