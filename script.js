function topPickCards(imageSrc, movieName, rating) {
    const htmlString = `<div class="col"> 
        <div class="card" style="width: 12rem;">
            <img src="${imageSrc}" class="card-img-top" alt="...">
            <div class="card-body">
                <button type="button" class="btn btn-outline-secondary favButton"><i class="bi bi-bookmark-heart-fill"></i></button>
                <h5 class="card-title">${movieName}</h5>
                <i class="bi bi-star-fill" style="color: yellow;"></i>
                <span>${rating}</span>
            </div>
        </div>
    </div>`;

    // Create a container element to hold the generated content
    const container = document.createElement('div');
    container.innerHTML = htmlString;

    // Append the generated content to the desired container in the document
    const rowElement = document.querySelector(".row");
    rowElement.appendChild(container.firstChild); // Append the first child of the container (the generated content)
}


const listOfMovies = ['Inception','Fight Club','12 Angry Men','Pulp Fiction','Forrest Gump','The Godfather','Dune: Part Two','The Dark Knight',"Schindler's List",'The Godfather Part II','The Shawshank Redemption','The Good, the Bad and the Ugly','The Lord of the Rings: The Two Towers', 'The Lord of the Rings: The Return of the King',  'The Lord of the Rings: The Fellowship of the Ring']
// Movies Searching
async function serachMovie(nameOfTheMovie) {
    const response = await fetch("https://www.omdbapi.com/?apikey=864d2b3f&t="+nameOfTheMovie)
    const result = await response.json()
    //console.log(result.Response)
    if(result.Response==="False"){
        alert("Please Enter a correct name")
    }else{
        //console.log(result.Poster)
        topPickCards(result.Poster,result.Title,result.imdbRating)
        // Some(result)
    }
}

// Populating top Pick's Section Content 
listOfMovies.forEach(movie =>{
    serachMovie(movie)
})

// finding & adding Event listiner on the More info page

const searchBar = document.querySelector("#exampleDataList")
searchBar.addEventListener("input",(event)=>{
    searchBarRecomendation(event.target.value)
})
const dataList = document.createElement("datalist"); // creating a dataList
dataList.setAttribute("id", "datalistOptions");
searchBar.appendChild(dataList);

async function searchBarRecomendation(params) {
    const url = 'https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/' + params;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '25148d09e0msh462a593aaee037ep12a628jsn1cffdbcd03b',
            'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // Clear existing options
        dataList.innerHTML = '';
        if (result.results && result.results.length > 0) {
            for (let i = 0; i < result.results.length; i++) {
                if (result.results[i] && result.results[i].title) {
                    const title = result.results[i].title;
                    const optionsList = document.createElement("option"); // creating a Options List
                    optionsList.setAttribute("value", title);
                    optionsList.setAttribute("data-link","http://127.0.0.1:5500/IMDB clone/index2.html?"+title);
                    dataList.appendChild(optionsList);
                } else {
                    console.log("Empty title or undefined result");
                }
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

searchBar.addEventListener("input", search)
function search(){
    if(dataList.children.length>0){
        console.log("number children element ",dataList.children.length)
        let firstResult = dataList.children[0].value
        console.log(firstResult)
    }
}

function redirectToLink() {
    const input = document.getElementById("exampleDataList");
    const selectedOption = input.value;

    const datalistOptions = document.getElementById("datalistOptions");
    const options = datalistOptions.getElementsByTagName("option");

    for (let i = 0; i < options.length; i++) {
        if (options[i].value === selectedOption) {
            const link = options[i].getAttribute("data-link");
            if (link) {
                window.open(link, "_blank");
            }
            break;
        }
    }
}

// search button handling
window.addEventListener('load', (event) => {
    const searchButton = document.querySelector(".searchButton");

searchButton.addEventListener("click", redirectToanotherPage);

function redirectToanotherPage(event) {
    event.preventDefault(); // Prevent the default behavior (e.g., form submission or page refresh)

    const searchItem = document.querySelector("#exampleDataList");

    if (searchItem.value.trim().length > 0) {
        window.open("http://127.0.0.1:5500/IMDB clone/index2.html?" + searchItem.value, "_blank");
    }
}

});

// favorite colection 
const rowElement = document.querySelector(".row");
function addingToFavoriteList(){
    if(rowElement.children.length > 0){
        const favoriteButtons = document.querySelectorAll(".favButton");
        favoriteButtons.forEach((button)=>{
            button.addEventListener("click",(event)=>{handlingFavButton(event)})});
}
}
// using the SetTimeout function such that top picks elements can be loaded
setTimeout(()=>{
    addingToFavoriteList()
},1500)

//storing the Favorite Movies 
let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
console.log("before adding favoriteMovies", favoriteMovies);

function applyMarkedState() {
    favoriteMovies.forEach((title) => {
        // Use event delegation to handle dynamic elements
        const extractingButtonElements = findButtonsByTitle(title);

        if (extractingButtonElements.length > 0) {
            // Iterate through the array of matching elements
            extractingButtonElements.forEach((buttonElement) => {
                if(buttonElement.children[0].classList.contains("favButton")){
                    buttonElement.children[0].classList.add("marked")
                }

            });
        } else {
            console.log("Element not found");
        }
    });
}

// function to find the Card with the Title 
function findButtonsByTitle(title) {
    const buttons = document.querySelectorAll('.card-title');
    const matchingButtons = [];
    buttons.forEach((button) => {
        if (button.textContent.includes(title)) {
        matchingButtons.push(button.parentElement);
        }
    });

    return matchingButtons;
}




function handlingFavButton(event) {
    const button = event.target;
    console.log(button)
    // Check if the clicked element has the 'marked' class and is a button
    if (button.classList.contains('marked') && button.classList.contains('btn')) {
        const movieTitle = button.parentElement.children[1].textContent;

        favoriteMovies = favoriteMovies.filter(title => title !== movieTitle);

        // Update localStorage with the modified favoriteMovies array
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

        console.log("removed", localStorage.getItem(movieTitle));
        console.log("Updated favoriteMovies", favoriteMovies);
    }
    
    // test code button.classList.contains('btn') && button.previousElementSibling && button.previousElementSibling.classList.contains('card-title'))

    // Check if the clicked element is a button and has a preceding .card-title element
    if (!button.classList.contains('marked')) {
        const cardTitle = button.parentElement.children[1].textContent
        // Add 'marked' class and update local storage
        button.classList.add('marked');
        favoriteMovies.push(cardTitle);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

        // // Disable pointer events (disable hover effect)
         button.style.pointerEvents = 'none';

         console.log("after adding", favoriteMovies);
    }
}

// Call applyMarkedState when the page loads
setTimeout(()=>{
    applyMarkedState()
},1000)


