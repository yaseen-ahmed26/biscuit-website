const actionBtn = document.getElementById("action-btn")

function logOutUser(){
    alert("Successfully logged out");
    localStorage.clear();
    window.location.replace("../index.html");
}

actionBtn.addEventListener("click", logOutUser);