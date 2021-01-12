const express = require('express');
const app = express();
let router = express.Router();
let model = require("../movie-data-logic.js");
const session = require('express-session');
app.use(session({ secret: 'sunlight'}));

router.get("/", loadSignupPage);
router.post("/", createUser);

function loadSignupPage(req, res, next){
    console.log("load page in signup-router\n");
    res.render("signup.pug", {});
}

function createUser(req, res, next){
    console.log("create page in signup-router\n");
    console.log(req.body);
    let newUser = req.body;

    if(model.createRegularUser(newUser)){

        //logging in user
        console.log("Logging in...");

        if(session.loggedin == true){
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
    }else{
        res.status(300).send("Please try another user name.");
    }
}

module.exports = router;
