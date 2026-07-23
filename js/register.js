import { getCurrentUser, makeHTTPRequest } from "./helpers/api.js";

const actionBtn = document.getElementById("action-btn");
const registerBtn = document.getElementById("register-btn")

const emailField = document.getElementById("email")
const usernameField = document.getElementById("username")
const passwordField = document.getElementById("password")
const confirmPasswordField = document.getElementById("confirm-password")

async function createUser(event){
    event.preventDefault();

    if(
        emailField.value == "" ||
        usernameField.value == "" ||
        passwordField.value == ""
    ){
        alert("Missing fields")
        return;
    }

    if(passwordField.value !== confirmPasswordField.value){
        alert("Passwords do not match")
        return;
    }

    try{
        const data = await makeHTTPRequest(
            "create",
            [emailField.value,
            usernameField.value,
            passwordField.value]
        )

        const loginData = await makeHTTPRequest("login", emailField.value, passwordField.value)
        
        localStorage.setItem("access_token", loginData.access_token);
        alert("Login successful");

        await getCurrentUser();
    }catch (error){
        alert(`${error.message}`)
    }
};

actionBtn.addEventListener("click", () => {
    window.location.replace("../index.html");
});
registerBtn.addEventListener("click", createUser)