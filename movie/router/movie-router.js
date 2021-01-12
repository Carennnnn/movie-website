const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const Movie = require("../model/MovieModel");


const express = require('express');
let router = express.Router();
let model = require("../movie-data-logic.js");

router.get("/", movieQueryParser);
router.get("/", loadMovies);
router.get("/:mid", loadSingleMovie);
router.post("/:mid/addLink", addLinkToDatabase);

router.param("mid", function(req, res, next, value){
    let oid;
    try{
		oid = new ObjectId(value);
	}catch(err){
		res.status(404).send("Movie ID " + value + " does not exist.");
		return;
    }
    
    Movie.findById(value, function(err, result){
        if(err){
            console.log(err);
            res.status(500).send("Error reading movie.");
			return;
        }

        if(!result){
			res.status(404).send("Movie ID " + value + " does not exist.");
			return;
        }
        
        req.movie = result;

		//first string in genre
        let genre = result.Genre.split(',')[0];
        let numSimilarMovies = 12;
        let mIndex = Math.floor((Math.random() * 400));
        console.log("start index is: " + mIndex);

        Movie.find()
        .where("Genre").regex(new RegExp(".*" + genre + ".*", "i"))
        .limit(numSimilarMovies)
        .skip(mIndex)
        .exec(function(err, results){
            if(err){
                res.status(500).send("Error reading similar movies");
			    console.log(err);
			    return;
            }

            results.forEach(m => {
                if(m.Title.length > 30){
                    m.Title = m.Title.substring(0, 28);
                }
            });

            req.similarMovies = results;
            next();
        })
        

    })

   
    
})

function movieQueryParser(req, res, next){
    const MAX_MOVIE = 24;

    let params = [];
    for(prop in req.query){
        if(prop == "page"){
            continue;
        }
        params.push(prop + "=" + req.query[prop]);
    }
    req.qstring = params.join("&");

    try{
        req.query.limit = req.query.limit || 24;
        req.query.limit = Number(req.query.limit);
        if(req.query.limit > MAX_MOVIE){
            req.query.limit = MAX_MOVIE;
        }
    }catch{
        req.query.limit = 24;
    }

    try{
        req.query.page = req.query.page || 1;
        req.query.page = Number(req.query.page);
        if(req.query.page < 1){
            req.query.page = 1;
        }
    }catch{
        req.query.page = 1;
    }

    if(!req.query.title){
        req.query.title = "?";
    }

    next();
}


function loadMovies(req, res, next){
    let startIndex = ((req.query.page-1) * req.query.limit);
    let number = req.query.limit;

    Movie.find()
    .where("Title").regex(new RegExp(".*" + req.query.title + ".*", "i"))
    .limit(number)
    .skip(startIndex)
    .exec(function(err, results){
        if(err){
            res.status(500).send("Error reading movies");
            console.log(err);
            return;
        }

        results.forEach(m => {
            if(m.Title.length > 30){
                m.Title = m.Title.substring(0, 31);
            }
        });
        res.movies = results;
        
        res.format({
            "text/html": () => {res.render("movie.pug", {movie: res.movies, qstring: req.qstring, current: req.query.page } )},
            "application/json": () => {res.status(200).json(res.movies)}
        });
        
        //res.status(200).send(JSON.stringify(res.movies));
        //next();
        return;
    })

    /*
   
    console.log("loadMovies in movie-router\n");
    let results = [];
    //let n = Object.keys(movieObj).length;
    for(let i = 0; i < 10; i++){
        if(movieMatch(movieObj[i], req.query)){
            results.push(movieObj[i]);
        }
    }

    res.movies = results;
    */
    
    //res.render("movie.pug", {movie: res.movies, qstring: req.qstring});
}


function loadSingleMovie(req, res, next){
   
    res.format({
		"application/json": function(){
			res.status(200).json(req.movie);
		},
		"text/html": () => { res.render("singleMovie.pug", {movie: req.movie, similarMovies: req.similarMovies}); }		
    });
    
    next();
    
}

function addLinkToDatabase(req, res, next){
    
    //req.movie.Link.pop();
    req.movie.Link.push(req.body.link);
    req.movie.save(function(err, result){
        if(err){
            console.log(err);
            res.status(500).send("Error saving link.");
            return;
        }
        res.status(200).redirect(`/movies/${req.movie._id}`);

    })
}

module.exports = router;