let movies = require("./movie-data.json");
let users = require("./user-data.json");
let movieSet = {};
let movieID = 0;
let movieLength = Object.keys(movies).length;

//check if users contain username

console.log("javascript loaded");

function containsUser(username){
    if(users.hasOwnProperty(username)){
        return true;
    }
    return false;
 }


function containsUserObject(userObj){
    if(!userObj){
        console.log("not a user object");
        return false;
    }
    if(!userObj.username || !users.hasOwnProperty(userObj.username)){
        console.log("don't \have this user name");
        return false;
    }
    return true;
}
    

 //create regular user by giving user object

function createRegularUser(newUserObject){
    if(newUserObject.username && newUserObject.password){

        if(users.hasOwnProperty(newUserObject.username)){
            console.log("Username already exists");
            return null;
        }

        else{
            
            newUserObject.recommended_movies = [];
            newUserObject.accountType = "regular";
            newUserObject.peopleFollowed = [];
            newUserObject.usersFollowed = [];
            newUserObject.reviews = [];

            users[newUserObject.username] = newUserObject;
            console.log(users);
            return newUserObject;

        }
    }

    console.log("You didn't enter username or password");
    
    return null;

}

function authenticate(username, password){
    return users.hasOwnProperty(username) && users[username].password == password;
}


//get user by username

function getUser(requestingUser, userId){
   if(!containsUserObject(requestingUser)){
       console.log("user is null");
        return null;
   }

   if(users.hasOwnProperty(userId)){
       if(requestingUser.username == userId){
           console.log("user names matched");
           return users[userId];
       }
   }

   return null;
}


//following a person

function followingPeople(thisUserName, peopleFollowedName){
    if(users.hasOwnProperty(peopleFollowedName)){
            if(!users[thisUserName].peopleFollowed.includes(peopleFollowedName)){
                users[thisUserName].peopleFollowed.push(peopleFollowedName);
            }
    }
    return;
}


//following a user

function followingUser(thisUser, userFollowed){
    if(users.hasOwnProperty(userFollowed)){
            if(!users[thisUser].usersFollowed.includes(userFollowed)){
                users[thisUser].usersFollowed.push(userFollowed);
            }
    }
    return;
}


//switch account, if user has regular account, switch to contributing
//if user has contributing account, switch to regular

function switchAccount(userName){
    console.log("Switching account...")
    /*
    console.log("This user's account type is: " + userObj.accountType);
    if(userObj.accountType == "regular"){
        console.log("Switching account to contributing")
        userObj.accountType = "contributing";
    }
    else{
        console.log("Switching account to regular")
        userObj.accountType = "regular";
    }
    */
    //1.get document.getelementbyid
    //stuff.addeventhandler("click",function sendswitchacounrequest)
    //function(){
//    ajax function
    //}
    if(containsUser(userName)){
        if(users[userName].accountType == "regular"){
            console.log("Switching account to contributing")
            users[userName].accountType = "contributing";
            return "contributing"
        }else{
            console.log("Switching account to regular")
            users[userName].accountType = "regular";
            return "regular"
        }

        return "";
    }
}

//delete a person in peopleFollowed array to stop following people

function stopFollowingPeople(thisUserName,peopleName){
    if(containsUser(thisUserName) && containsUser(peopleName)){
        if(users[thisUserName].peopleFollowed.includes(peopleName)){
            let deleteIndex = users[thisUserName].peopleFollowed.indexOf(peopleName);
            users[thisUserName].peopleFollowed.splice(deleteIndex, 1);
        }
    }
    return;
}

//delete a user in usersFollowed array to stop following users

function stopFollowingUsers(thisUserName,userName){
    if(containsUser(thisUserName) && containsUser(userName)){
        if(users[thisUserName].usersFollowed.includes(userName)){
            let deleteIndex = users[thisUserName].usersFollowed.indexOf(userName);
            users[thisUserName].usersFollowed.splice(deleteIndex, 1);
        }
    }
}


//generate 9 random movies

function generateRandomMovies(){
    let randomMovieArray = [];
    for(let i = 0; i < 9; i++){
        let randomNumer = Math.floor((Math.random() * Object.keys(movies).length));
        randomMovieArray[i] = movies[randomNumer];
        console.log(randomNumer);
    }
    return randomMovieArray;
}


//get movie by movie names desregard case

function getMovieByName(movieName){
    for(let i = 0; i < Object.keys(movies).length; i++){
        if(movies[i].Title.toUpperCase() == movieName.toUpperCase()){
            return(movies[i]);
        }
    }return null;
}

function getMovieById(mid){
    for(let i = 0; i < Object.keys(movies).length; i++){
        if(mid == movies[i].imdbID){
            return(movies[i]);
        }
    }return null;
}


//search movies by providing similar results

function searchMovie(keyword){
    let result = [];
    for(let i = 0; i < Object.keys(movies).length; i++){
        if(movies[i].Title.indexOf(keyword) >= 0){
            result.push(movies[i]);
        }
    }
    return result;
}

let userA = createRegularUser({username: "amy", password: "123"});
let userB = createRegularUser({username: "john", password: "134"});


//export data

module.exports = {
    users,
    movies,
    containsUser,
    createRegularUser,
    getUser,
    followingPeople,
    followingUser,
    switchAccount,
    stopFollowingPeople,
    stopFollowingUsers,
    generateRandomMovies,
    getMovieByName,
    getMovieById,
    searchMovie,
    containsUserObject,
    authenticate
}







//Testing the code above

/*
console.log("Creating users testing");
let user1 = createRegularUser({username: "blue", password: "234"});
let user2 = createRegularUser({username: "sky", password: "514"});
console.log(users);


console.log("Contains users testing");
console.log("blue is in the users: ");
console.log(containsUser("blue"));
console.log("ammy is in the users: ");
console.log(containsUser("ammy"));


console.log("getUser testing");
console.log("Get user blue:");
console.log(getUser("blue"));
console.log("Get user cindy:");
console.log(getUser("cindy"));


console.log("Following users testing");
followingUser("blue", "grace");
console.log(getUser("blue"));


console.log("Switching account testing");
switchAccount("alice");
console.log(getUser("alice"));



console.log("Following people testing");
followingPeople("blue", "sky");
followingPeople("blue", "alice");
console.log(getUser("blue"));



console.log("Stop Following people testing");
stopFollowingPeople("blue", "sky");
console.log(getUser("blue"));



console.log("Following users testing");
followingUser("blue", "grace");
followingUser("blue", "sky");
console.log(getUser("blue"));


console.log("Stop following users testing");
stopFollowingUsers("blue", "sky");
console.log(getUser("blue"));



console.log("Test random movie generation");
let ranMovie = generateRandomMovies();
console.log(ranMovie);



console.log("Test get movie by name");
let movieGot = getMovieByName("The Lovers on the Bridge");
console.log(movieGot);



console.log("search movies testing");
console.log(searchMovie("love"));
*/