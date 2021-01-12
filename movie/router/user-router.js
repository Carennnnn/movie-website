const express = require('express');
const app = express();
let router = express.Router();
let model = require("../movie-data-logic.js");
const session = require('express-session');
app.use(session({ secret: 'sunlight'}));

router.get("/", loadSingleUser);
router.get("/:uid", getUser);
router.post("/:uid/switchAccount", switchAccount);


function loadSingleUser(req, res, next){
    //let result = model.getUser(req.session.user, req.query.name);
    
    console.log("load user from user-router\n");
    if(req.session.loggedin == true){
        res.status(200).redirect(`/users/${req.session.user.username}`);
    }else{
        res.status(404).send("You must log in to see your profile.");
    }

}

function getUser(req, res, next){
    console.log("get user from user-router\n");
    console.log("Getting username: " + req.params.uid);
    console.log(req.session.user);
    let result = model.getUser(req.session.user, req.params.uid);

    if(result == null){
        res.status(404).send("User is unknown");
    }else{
        res.status(200).render("users.pug", {user: result, session: req.session})
    }
}

function switchAccount(req, res, next){
    console.log("switch account from user-router\n");
    console.log("Account is switching...");

    console.log("server: "+ req.params.uid + " is switching account");
    let result = model.switchAccount(req.params.uid);

    if(result != ""){
        console.log("Switching account successful");
        console.log(result);
        res.status(200).json(result);
    }else{
        res.status(401).send("Switching account unsuccessfully");
    }
}

module.exports = router;