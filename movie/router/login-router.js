const express = require('express');
let router = express.Router();
let model = require("../movie-data-logic.js");

router.get("/", loadLoginPage);
router.post("/", loginUser);

function loadLoginPage(req, res, next){
    console.log("This is login router\n");
    res.render("login.pug", {});
}
          
function loginUser(req, res, next){
    console.log("This is from router");
    console.log("Logging in...");

    if(req.session.loggedin == true){
        res.send("You are already logged in");
    }else{
        let userLog = req.body;
        console.log(userLog.username + " is trying to log in");
        console.log(req.body.username);
        console.log(req.body.password);
        if(model.authenticate(req.body.username, req.body.password)){
            console.log("User is Logging in");
            req.session.user = model.users[req.body.username];
            req.session.loggedin = true;
            res.status(200).redirect(`/users/${userLog.username}`);
        }else{
            res.status(401).send("Invalid users");
        }
    }
}

module.exports = router;