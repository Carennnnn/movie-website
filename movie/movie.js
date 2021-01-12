let movieObject;

function init(){
    navClick();
}


function loadData(){
    let fs = require('fs');
    fs.readFile('./movie-data-short.json', (err, data) =>{
        if(err){
            console.log(err);
        }
        else{
            movieObject = JSON.parse(data);
        }
    })
}
