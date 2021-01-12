const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = Schema({
    Poster: {type: String},
    Title: {type: String},
    imdbRating: {type: String},
    Year: {type: String},
    Released: {type: String},
    Runtime: {type: String},
    Genre: {type: String},
    Plot: {type: String},
    Director: {type: String},
    Writer: {type: String},
    Actors: {type: String},
    Link: [{type: String}]
});

module.exports = mongoose.model("Movie", movieSchema);