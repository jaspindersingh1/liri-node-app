
require("dotenv").config();

const keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require("moment");
var axios = require("axios");
var fs = require("fs")

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
    console.log("Searching for Concerts: \n---------------------------\n");
    bandsCall();

} else if(search === "spotify-this-song") {
    console.log("Searching for Spotify Songs: \n---------------------------\n");
    spotifyCall();

} else if(search === "movie-this") {
    console.log("Searching for Movies: \n---------------------------\n");
    omdbCall();

} else if(search === "do-what-it-says") {
    console.log("Searching: \n---------------------------\n");
    fileReadCall();
}

function bandsCall() {
    var artist = term
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios
        .get(URL)
        .then(function(concertResponse){

            var concerInfo = concertResponse.data
            // console.log(concerInfo)

            var venue = concerInfo[0].venue.name;
            console.log("Venue: " + venue);

            var venueLoc = concerInfo[0].venue.city;
            console.log("Venue Location: " + venueLoc);

            var venueDate = concerInfo[0].datetime;
            venueDate = moment(venueDate).format("dddd, MMMM Do YYYY, h:mm A")
            console.log("Venue Date: " + venueDate);

            console.log("\n---------------------------");

        });
};

function spotifyCall() {
    spotify
        .search({ type: 'track', query: term })
        .then(function(response) {
            // console.log(response.tracks.items[0]);

            var callRespone = response.tracks.items[0];
            // console.log(callRespone)

            var artistInfo = callRespone.artists[0].name;
            console.log("Artist: " + artistInfo);

            var albumTitle = callRespone.album.name;
            console.log("Album: " + albumTitle);

            var songName = callRespone.name;
            console.log("Song Name: " + songName);

            var previewLink = callRespone.preview_url;
            console.log("Watch Preview: " + previewLink);

            console.log("\n---------------------------");

        })
        .catch(function(err) {
            console.log(err);
        });
        
};

function omdbCall() {
    var movieName = term
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios
        .get(queryUrl)
        .then(function(response){
            // console.log(response.data)

            var titleMovie = response.data.Title;
            console.log("Title: " + titleMovie);

            var yearMovie = response.data.Year;
            console.log("Year: " + yearMovie);

            var imdbMovie = response.data.imdbRating;
            console.log("IMDB Rating: " + imdbMovie);

            var rotMovie = response.data.Ratings[1].Value;
            console.log("Rotten Tomato Ratings: " + rotMovie);

            var countryMovie = response.data.Country;
            console.log("Country: " + countryMovie);

            var lanMovie = response.data.Language;
            console.log("Language: " + lanMovie);

            var plMovie = response.data.Plot;
            console.log("Plot: " + plMovie);

            var actMovie = response.data.Actors;
            console.log("Actors: " + actMovie);

            console.log("\n---------------------------");
        });
};

function fileReadCall() {
    fs.readFile("random.txt", "utf8", function(error, data){
        // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      } 
      
    //   console.log(data)

      var dataArr = data.split(",");

      var readIT = dataArr[1].replace (/"/g,'');
      console.log(readIT)

      spotifyCall(term = readIT)
    })
};