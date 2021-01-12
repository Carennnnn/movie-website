let switchBtn = document.getElementById("switchAccount");
let uName = document.getElementById("username").innerHTML;
//onClick="switchAccount('#{user.username}'
switchBtn.addEventListener("click", function(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(){
        let accountInfo = document.getElementById("accountType");
        if(this.status === 200){
            console.log("this works");
            let accountString = JSON.parse(this.responseText);
            accountInfo.innerHTML = accountString;
        }
    });

    xhr.open("POST", "/users/"+uName+"/switchAccount", true);
    xhr.send();
})
