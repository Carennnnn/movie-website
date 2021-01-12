let users = require("./user-data.json");

function switchAccount(userName){
    console.log("Switching account...")
    if(containsUser(userName)){
        if(users[userName].accountType == "regular"){
            console.log("Switching account to contributing")
            users[userName].accountType = "contributing";
        }else{
            console.log("Switching account to regular")
            users[userName].accountType = "regular";
        }
    }
}

function containsUser(username){
    if(users.hasOwnProperty(username)){
        return true;
    }
    return false;
 }
