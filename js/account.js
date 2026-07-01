const actionBtn = document.getElementById("action-btn")

const usernameLabel = document.getElementById("username-label")
const emailLabel = document.getElementById("email-label")
const passwordLabel = document.getElementById("password-label")

function loadUserData(){
    const userData = localStorage.getItem("user_data");

    if(!userData){
        alert("No save data found, create an account instead")
        window.location.replace("../index.html");
        return;
    }

    const saveData = JSON.parse(userData)

    emailLabel.textContent = saveData.email;
    usernameLabel.textContent = saveData.username;
}

function logOutUser(){
    console.log("log out")
}

actionBtn.addEventListener("click", logOutUser);
loadUserData();