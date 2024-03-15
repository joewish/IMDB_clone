/// importing the favorate movie list from script file
// import { favoriteMovies } from "./script.js";



// featching url 
window.onload = () => {
    let moviename = document.location.href.split("?")[1].split("%20").filter((word)=>{if(word.length>0){return word}}).join(" ") // handling movie name with dirrent characters
    fetchResults(moviename)
}
const descriptionTag = document.querySelector('.movieDescription');
async function fetchResults(params) {
    const response = await fetch("https://www.omdbapi.com/?apikey=864d2b3f&t="+params+"&plot=long");
    const result = await response.json();
    //console.log(result)
    addingAndPolulatingMovieData(result);
}

// creating and poluating Movie data with the respective Tags
function addingAndPolulatingMovieData(params) {
    const descriptionTag = document.querySelector('.movieDescription');
    const imagesection = document.querySelector(".card-img-top")
    for (let i in params) {
        if ((i.toLowerCase() === "ratings") || (params[i] === "N/A")) {
            continue;
        } else if (i.toLowerCase() === "plot") {
            const plotTag = document.createElement("p");
            plotTag.textContent = `${i}: ${params[i]}`;
            descriptionTag.appendChild(plotTag);
        } else if((i.toLowerCase() === "poster")){
            imagesection.setAttribute("src",params[i])
        }
         else {
            const h6Tags = document.createElement("h6");
            h6Tags.textContent = `${i}: ${params[i]}`;
            descriptionTag.appendChild(h6Tags);
        }
    }
}

// handling the favirote  
// Retrieve the existing favoriteMovies from localStorage
let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

// Get all favorite buttons and attach event listeners
const favoriteButtons = document.querySelector(".favButton");
favoriteButtons.addEventListener("click", (event)=>{addToFavlist(event)})

function addToFavlist(event) {
    // const movieTitle = event.target.parentElement.querySelector("h5").textContent.trim();
    const movieTitle = favoriteButtons.parentElement.getElementsByTagName("h6")[0].textContent.split(":")[1].trim();
    console.log(movieTitle);
    const isMarked = event.target.classList.contains("marked");

    if (!isMarked) {
        event.target.classList.add("marked");
        checkInThelocalStorage(movieTitle);
    } else {
        event.target.classList.remove("marked");
        removeFromLocalStorage(movieTitle);
    }
}

function checkInThelocalStorage(name) {
    // Check if the movie is already in the favoriteMovies list
    if (!favoriteMovies.includes(name)) {
        console.log("yes")
        favoriteMovies.push(name);
        // Store the updated favoriteMovies list back to localStorage
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }
}

function removeFromLocalStorage(name) {
    // Remove the movie from the favoriteMovies list
    favoriteMovies = favoriteMovies.filter(movie => movie !== name);
    // Store the updated favoriteMovies list back to localStorage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}