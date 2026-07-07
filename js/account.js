import { updateUserEndpoint } from "./helpers/api.js"

const actionBtn = document.getElementById("action-btn")
const updateBtn = document.getElementById("update-btn")

const usernameLabel = document.getElementById("username-label")
const emailLabel = document.getElementById("email-label")

const updateEmailField = document.getElementById("update-email")
const updateUsernameField = document.getElementById("update-username")
const updatePasswordField = document.getElementById("update-password")
const currentPasswordField = document.getElementById("current-password")

function loadUserData(){
    const userData = localStorage.getItem("user_data");

    if(!userData){
        alert("No save data found, create an account instead")
        window.location.replace("../index.html");
        return;
    };

    const saveData = JSON.parse(userData);

    emailLabel.textContent = "Email: " + saveData.email;
    usernameLabel.textContent = "Username: " + saveData.username;
}

function logOutUser(){
    alert("Successfully logged out");
    localStorage.clear();
    window.location.replace("../index.html");
}

async function updateUserData(){
    try{
        const data = await updateUserEndpoint(
            updateUsernameField.value,
            updateEmailField.value,
            updatePasswordField.value,
            currentPasswordField.value
        )

        alert('Success');

        localStorage.setItem("user_data", JSON.stringify(data));
        
        loadUserData()

        updateEmailField.value = ""
        updateUsernameField.value = ""
        updatePasswordField.value = ""
    }catch (error){
        alert(`${error.message}`)
    }
}

actionBtn.addEventListener("click", logOutUser);
updateBtn.addEventListener("click", updateUserData);
loadUserData();