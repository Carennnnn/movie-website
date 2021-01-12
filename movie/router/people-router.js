const express = require('express');
let router = express.Router();

router.get("/", loadPeople);

function loadPeople(req, res, next){
    let results = [];
    for(let i = 0; i < movieObj.length; i++){
        results.push(movieObj[i]);
    }
    res.people = results;
    res.render("people.pug", {people: res.people, qstring: req.qstring});
}

/*
app.get("/", (req, res, next) => {
    let results = [];
    for(let i = 0; i < movieObj.length; i++){
        results.push(movieObj[i]);
    }
    res.people = results;
    res.render("people.pug", {people: res.people, qstring: req.qstring});
})
*/

module.exports = router;