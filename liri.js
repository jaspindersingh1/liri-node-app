
require("dotenv").config();

var axios = require("axios");

// Grab or assemble the movie name and store it in a variable called "search"
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (!search) {
    search = "movie-this";
  }
  
if (!term) {
term = "Mr. Nobody";
}

if (search === "concert-this") {
    console.log("Searching for Concerts: \n---------------------------");
    var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp"

    axios
        .get(URL)
        .then(function(concertResponse){

            var concerInfo = concertResponse.data
            // console.log(concerInfo)

            var venue = concerInfo[0].venue.name;
            console.log("Venue: " + venue)

            var venueLoc = concerInfo[0].venue.city;
            console.log("Venue Location: " + venueLoc)

            var venueDate = Date(concerInfo[0].datetime);
            console.log("Venue Date: " + venueDate)
        });

} else if(search === "spotify-this-song") {
    console.log("Searching for Spotify Songs: \n---------------------------");





    
} else if(search === "movie-this") {
    console.log("Searching for Movies: \n---------------------------");
    // function movie() {

        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";
    
        axios
            .get(queryUrl)
            .then(function(response){
                // console.log(response.data)
    
                var titleMovie = response.data.Title;
                console.log("Title: " + titleMovie)
    
                var yearMovie = response.data.Year;
                console.log("Year: " + yearMovie)
    
                var imdbMovie = response.data.imdbRating;
                console.log("IMDB Rating: " + imdbMovie)
    
                var rotMovie = response.data.Ratings[1].Value;
                console.log("Rotten Tomato Ratings: " + rotMovie)
    
                var countryMovie = response.data.Country;
                console.log("Country: " + countryMovie)
    
                var lanMovie = response.data.Language;
                console.log("Language: " + lanMovie)
    
                var plMovie = response.data.Plot;
                console.log("Plot: " + plMovie)
    
                var actMovie = response.data.Actors;
                console.log("Actors: " + actMovie)
            });
    // };

    // movie();

} else if(search === "do-what-it-says") {
    console.log("Searching: \n---------------------------");

}


