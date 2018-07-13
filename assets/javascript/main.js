// Create <img> element inside .recipe-container.
function createImg(src) {
    // Create <img> element.
    var element = document.createElement('img');
        // Set <img> src to the image link in the API response.
        element.src = src;

        return element;
};

// Create <a> element inside .recipe-container with link to the recipe.
function createLabel(label, link) {
    // Create <a> element.
    var element = document.createElement('a');
        // Set the html of the element to the label in the API response.
        element.innerHTML = label;
        // Set the href attribute to the link in the API response.
        element.setAttribute('href', link);

        return element;
};

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
            // Loop through the response hits(like-array).
            response.hits.forEach(function(hit) {
                // Create div inside itemBox variable.
                var itemBox = document.createElement('div');
                // Set itemBox class to '.recipe-container'.
                itemBox.setAttribute('class', 'recipe-container');
                // Append a label and link to the '.recipe-container'.
                itemBox.appendChild(createLabel(hit.recipe.label, hit.recipe.url));
                // Append an image to the '.recipe-container'.
                itemBox.appendChild(createImg(hit.recipe.image));
                
                // Append '.recipe-container' to '.display-recipe' div.
                document.getElementById('display-recipe').appendChild(itemBox);
            });
           /* response.hits.forEach(function(hit) {
                var recipeImg = document.createElement('img');
                recipeImg.setAttribute('class', 'recipe-item');
                recipeImg.src = hit.recipe.img;
                document.getElementsByClassname('recipe-container').appendChild(recipeImg);
            })*/
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
            if(xhr.status === 400 || xhr.status === 404) {
                alert('Choose a food item.');
            }
            var response = JSON.parse(xhr.response);
            console.log(response.hints[0].food.nutrients);
            //var newDiv = document.createElement("div");
            //newDiv.innerHTML = response.hints[0].food.nutrients;
            document.getElementById('display-nutrition').innerHTML = 'Calories: ' + response.hints[0].food.nutrients.ENERC_KCAL + '<br>' +
                'Protein: ' + response.hints[0].food.nutrients.PROCNT + 'g' + '<br>' +
                'Fat: ' + response.hints[0].food.nutrients.FAT + 'g' + '<br>' +
                'Carbs: ' + response.hints[0].food.nutrients.CHOCDF + '%';

        };
        // Send request.
        xhr.send();
    };
    getNutrition();
});

