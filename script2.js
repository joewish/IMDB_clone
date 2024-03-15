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
// const favoriteButton= document.querySelector(".favButton")
// favoriteButton.addEventListener("click",addToFavlist)

// function addToFavlist() {
//     const movieTitle  = favoriteButton.parentElement.children[1].textContent.split(":")[1].trim()
//     if(!favoriteButton.classList.contains("marked")){
//         favoriteButton.classList.add("marked")
//         checkInThelocalStorage(movieTitle)//fcuntion to check whether the movie is already in the local storage 
//     }else{
//         favoriteButton.classList.remove("marked")
//     }
// }
// console.log(localStorage)
// function checkInThelocalStorage(movieName) {
//     if(localStorage.getItem(movieName)==null){
//         console.log(favoriteMovies.getItem(movieName))
//         // localStorage.setItem('favoriteMovies', movieName);
//         // console.log(localStorage)
//     }
// }
// setTimeout(()=>{
//     const favButton = document.querySelectorAll(".favButton");
//     favButton.addEventListener("click",addingToFavoriteList)
// },1000)
// function addingToFavoriteList(){
//     if(descriptionTag.children.length>0){
//         console.log(document.querySelectorAll(".favButton"))
//     }else{
//         console.log("No description")
//     }
// }
localStorage.removeItem("favoriteMovies","Hitman's Wife's Bodyguard")
console.log(localStorage)