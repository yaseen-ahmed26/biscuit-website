import { getCurrentUser, makeHTTPRequest } from "./helpers/api.js";
import { changeWindow } from "./helpers/window.js";

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
        return;
    }

    if(passwordField.value !== confirmPasswordField.value){
        return;
    }

    try{
        const userData = {
            email: emailField.value,
            username: usernameField.value,
            password: passwordField.value
        };

        const data = await makeHTTPRequest({
            requestType: "POST",
            requestBody: userData,
            requestHeaders: {"Content-Type": "application/json"},
            requestURL: "users"
        })

        const params = new URLSearchParams()
        
        params.append("username", emailField.value)
        params.append("password", passwordField.value)
        
        const loginData = await makeHTTPRequest({
            requestType: "POST",
            requestBody: params,
            requestHeaders: {"Content-Type": "application/x-www-form-urlencoded"},
            requestURL: "auth/login"
        })

        await getCurrentUser();
    }catch (error){
        alert(`${error.message}`)
    }
};

registerBtn.addEventListener("click", createUser)