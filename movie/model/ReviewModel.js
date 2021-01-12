const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = Schema({
    movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
    link: {type: String},
    rating: {type: Number},
    summary: {type: String},
    review: {type: String}
});

module.exports = mongoose.model("Review", reviewSchema);
