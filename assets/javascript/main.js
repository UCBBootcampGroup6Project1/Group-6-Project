// Click event handler for recipe-button.
$('#recipe-button').on('click', function (event) {
    // Prevents default event action.
    event.preventDefault();
    // Saves the user's in the ingrInput variable.
    const ingrInput = $('#ingredients-input').val().trim();

    // API url for making 'GET' request to find recipes.
    const recipeUrl = "https://api.edamam.com/search?q=" + ingrInput + "&app_id=7919900d&app_key=47fe0acea0eb3f17386dadb3b722e233";

    // Makes a 'GET' request to the API and returns data through an XMLHttpRequest
    function searchRecipe(){

        // Request object.
        const xhr = new XMLHttpRequest();
        // Initialize/reinitialize existing 'GET' request to the API.
        xhr.open('GET', recipeUrl, true);
        // .withCredentials takes a boolean. Indicates that 'cross-site' requests should be made with credentials/cookies.
        xhr.withCredentials = true;
        // .onload triggers when request is complete.
        xhr.onload = function () {
            var response = JSON.parse(xhr.response);
            // Logs response to console in json format.
            console.log(response);
            response.hits.forEach(function(hit){
                var newDiv = document.createElement("div");
                newDiv.innerHTML = hit.recipe.image;
                document.body.appendChild(newDiv);
            });
        };
        // Sends the request.
        xhr.send();
    };
    // Calls the searchRecipe() function.
    searchRecipe();
});

 
// Click event handler for nutrition-button.
$('#nutrition-button').on('click', function (event) {
    event.preventDefault();

    // Saves user input in the nutrInput variable.
    const nutrInput = $('#nutrition-input').val().trim();
    
    // API url for making 'GET' request for nutrition values.
    const nutrUrl = "https://api.edamam.com/api/food-database/parser?ingr=" + nutrInput + "&app_id=9e4c6c3d&app_key=8954976b9cc76c3cf1396f60f23e75ab";

    // Makes a 'GET' request to the API and returns data through an XMLHttpRequest.
    function getNutrition() {

        // Request object.
        const xhr = new XMLHttpRequest();
        // Initialize/Reinitialize existing 'GET' request to the API.
        xhr.open('GET', nutrUrl, true);
        // Make requests with cookies/credentials
        xhr.withCredentials = true;
        // When request is complete logs the response.
        xhr.onload = function () {
            var response = JSON.parse(xhr.response);
            console.log(JSON.parse(xhr.response));
            console.log('food uri', response.hints[0].food.uri);
        };
        // Send request.
        xhr.send();
    };
    getNutrition();
});