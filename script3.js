
let listOfMovies=[]


function fetchAndPopulateTheListofMovies() {
  // Get the favoriteMovies string from localStorage
const favoriteMoviesString = localStorage.getItem("favoriteMovies");
console.log(favoriteMoviesString)

// Convert the string to an array of movie names
const favoriteMoviesArray = favoriteMoviesString.split(",");

// Remove the square brackets and double quotes from each movie name
favoriteMoviesArray.forEach((movie) => {
    // Remove square brackets and double quotes from the movie name
    const movieName = movie.replace(/[\[\]"]/g, '');
    populateTheButtons(movieName);
});
}
const mainListDiv = document.querySelector(".list-group")
function populateTheButtons(movieName) {
    // Create a button element
    const buttonElement = document.createElement('button');
    
    // Set button attributes
    buttonElement.setAttribute('type', 'button');
    buttonElement.classList.add('list-group-item', 'list-group-item-action');
    buttonElement.setAttribute('aria-current', 'true');
    
    // Set button text content
    buttonElement.textContent = movieName;
    
    // Append the button to the mainListDiv
    mainListDiv.appendChild(buttonElement);
}

fetchAndPopulateTheListofMovies()