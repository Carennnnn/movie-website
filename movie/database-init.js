const express = require('express');
const app = express();
const mongoose = require("mongoose");
let db;

app.use(express.json());
const Movie = require("./model/MovieModel");
const Review = require("./model/ReviewModel");

let moviedata = require("./movie-data.json");
let movieArr = [];

let movieObj;
const fs = require("fs");
fs.readFile("./movie-data.json", (err, data)=>{
    if(err){
        console.log(err);
    }else{
        movieObj = JSON.parse(data);
        let movieLength = Object.keys(movieObj).length;
        
        //******************************** */
        for(let i = 0; i < movieLength; i++){
            let m = new Movie();
            m.Poster = movieObj[i].Poster;
            m.Title = movieObj[i].Title;
            m.imdbRating = movieObj[i].imdbRating;
            m.Year = movieObj[i].Year;
            m.Released = movieObj[i].Released;
            m.Runtime = movieObj[i].Runtime;
            m.Genre = movieObj[i].Genre;
            m.Plot = movieObj[i].Plot;
            m.Director = movieObj[i].Director;
            m.Writer = movieObj[i].Writer;
            m.Actors = movieObj[i].Actors;
            movieArr.push(m);
        }


        mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true});

        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            mongoose.connection.db.dropDatabase('movies', function(err, result){
                if(err) throw err;
                console.log("Dropped movies database.");

                let completedMovies = 0;
                movieArr.forEach(movie => {
                    movie.save(function(err, result){
                        if(err) throw err;
                        completedMovies++;
                        if(completedMovies >= movieLength){
                            console.log("All movies saved.");
                        }

                    })
                })
            })
        })
    }
});
