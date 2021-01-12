const express = require('express');
const app = express();
let router = express.Router();
const session = require('express-session');
app.use(session({ secret: 'sunlight'}));

router.get("/", logout);

function logout(req, res){
    console.log("logout from logout-router\n");
    req.session.destroy();
    res.redirect('/login');
}

/*
app.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect('/login');
});
*/

module.exports = router;