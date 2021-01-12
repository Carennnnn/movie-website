const express = require('express');
const model = require("./movie-data-logic.js");
const app = express();
const mongoose = require("mongoose");
let db;

app.use(express.static("views"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const session = require('express-session');
app.use(session({ secret: 'sunlight'}));

/*
let movieObj;
const fs = require("fs");
fs.readFile("./movie-data.json", (err, data)=>{
    if(err){
        console.log(err);
    }else{
        movieObj = JSON.parse(data);
    }
});
*/

app.set("views", "./views");
app.set("view engine", "pug");


//set router
let loginRouter = require("./router/login-router");
app.use("/login", loginRouter);

let movieRouter = require("./router/movie-router");
app.use("/movies", movieRouter);

let signupRouter = require("./router/signup-router");
app.use("/signup", signupRouter);

let userRouter = require("./router/user-router");
app.use("/users", userRouter);

let peopleRouter = require("./router/people-router");
app.use("/people", peopleRouter);

let logoutRouter = require("./router/logout-router");
app.use("/logout", logoutRouter);

let searchRouter = require("./router/search-router");
app.use("/search", searchRouter);

app.use("/", function(req, res, next){
    console.log("request from user: " + req.session.username);
    next();
});

/*
app.get("/", (req, res, next) =>{
    res.movies = movieObj;
    res.render("movie.pug", {movie: res.movies, current: 0});
});
*/

app.get("/", function(req, res) {
    //mongoose.connection.db.collection("config").find
    res.status(200).redirect("/movies");

})

mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to moviedatabase.");
    app.listen(3000);
    console.log('Server running at http://localhost:3000');

});


function auth(req, res, next){
    if(!req.session.user){
        res.status(403).send("You need to login first.");
    }
    next();
}

function queryParser(req, res, next){
    let params = [];
    for(prop in req.query){
        params.push(prop + "=" + req.query[prop]);
    }
    req.qstring = params.join("&");

    if(!req.query.title){
        req.query.title = "*";
    }if(!req.query.genre){
        req.query.genre = "*";
    }if(!req.query.year){
        req.query.year = "*";
    }if(!req.query.actor){
        req.query.actor = "*";
    }
    next();
}




//npm install uuid