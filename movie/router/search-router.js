const express = require('express');
let router = express.Router();

router.post("/", searchByTitle);

function searchByTitle(req, res, next){
    res.status(200).redirect(`/movies?title=${req.body.title}`);
}

/*
app.post("/search", function(req, res, next){
    res.status(200).redirect(`/movies/?title=${req.body.title}`)
})
*/

module.exports = router;