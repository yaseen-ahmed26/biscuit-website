import { getCurrentUser, makeHTTPRequest } from "./helpers/api.js";
import { changeWindow } from "./helpers/window.js";

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

        alert("Login successful");

        await getCurrentUser();
    }catch (error){
        alert(`${error.message}`)
    }
};

actionBtn.addEventListener("click", () => {
   changeWindow("index.html")
});
registerBtn.addEventListener("click", createUser)