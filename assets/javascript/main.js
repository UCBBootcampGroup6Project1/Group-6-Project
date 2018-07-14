// Create <img> element inside .recipe-container.
function createImg(src) {
    // Create <img> element.
    var element = document.createElement('img');
        // Set <img> src to the image link in the API response.
        element.src = src;

        return element;
}

// Create <a> element inside .recipe-container with link to the recipe.
function createLabel(label, link) {
    // Create <a> element.
    var element = document.createElement('a');
        // Set the html of the element to the label in the API response.
        element.innerHTML = label;
        // Set the href attribute to the link in the API response.
        element.setAttribute('href', link);

        return element;
}

// Click event handler for recipe-button.
$('#recipe-button').on('click', function (event) {
    // Prevents default event action.
    event.preventDefault();
    // Saves the user's in the ingrInput variable.
    const ingrInput = $('#ingredients-input').val().trim();
    if (ingrInput == '') {
        swal('Please input at least one food item.');
    }

    // API url for making 'GET' request to find recipes.
    const recipeUrl = "https://api.edamam.com/search?q=" + ingrInput + "&app_id=44446b38&app_key=d47398d9c6d64bae4a20858ee13beadc";
    // Makes a 'GET' request to the API and returns data through an XMLHttpRequest
    function searchRecipe(){
        // Empties the #display-recipe div every time a new search is made.
        document.getElementById('display-recipe').innerHTML = '';
        // Request object.
        const xhr = new XMLHttpRequest();
        // Check for valid input. (400, 404)
        xhr.onreadystatechange = function() {
            // If complete.
            if (xhr.readState === 4) {
                // If 'OK'.
                if(xhr.status === 200) {
                    console.log('success');
                } else {
                    swal('Invalid input');
                }
            }
        }

        // Initialize/reinitialize existing 'GET' request to the API.
        xhr.open('GET', recipeUrl, true);
        // .withCredentials takes a boolean. Indicates that 'cross-site' requests should be made with credentials/cookies.
        xhr.withCredentials = true;
        // .onload triggers when request is complete.
        xhr.onload = function () {
            console.log('DONE', xhr.status);
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
        }

        // Sends the request.
        xhr.send();
    }

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
        
        // Check for bad request.
        xhr.onreadystatechange = function() {
        // If complete.
        if (xhr.readyState === 4) {
            // Check if 'OK'
            if (xhr.readyState === 200) {
                console.log('Successful API call.');
            } 
            else {
                swal('Invalid input.');
            }
        }
    }

        // Initialize/Reinitialize existing 'GET' request to the API.
        xhr.open('GET', nutrUrl, true);
        // Make requests with cookies/credentials
        xhr.withCredentials = true;
        // When request is complete logs the response.
        xhr.onload = function () {
            var response = JSON.parse(xhr.response);
            console.log(response.hints[0].food.nutrients);
            
            var protein = response.hints[0].food.nutrients.PROCNT;
            var calories = response.hints[0].food.nutrients.ENERC_KCAL;
            var fat = response.hints[0].food.nutrients.FAT;
            var carbs = response.hints[0].food.nutrients.CHOCDF;

            document.getElementById('display-nutrition').innerHTML = 'Calories: ' + calories.toFixed(2) + '<br>' +
                'Protein: ' + protein.toFixed(2) + 'g' + '<br>' +
                'Fat: ' + fat.toFixed(2) + 'g' + '<br>' +
                'Carbs: ' + carbs.toFixed(2) + '%';

        }
        // Send request.
        xhr.send();
}
    getNutrition();
});

