import { getCurrentUser,  makeHTTPRequest, getNewRefresh } from "./helpers/api.js";
import { changeWindow, showToast } from "./helpers/window.js";

const loginBtn = document.getElementById("login-btn")
const showPasswordBtn = document.getElementById("show-password")

const passwordImage = document.getElementById("image")

const loginEmailField = document.getElementById("login-email")
const loginPasswordField = document.getElementById("login-password")

async function loginUser(event){
    event.preventDefault();

    if(loginEmailField.value === ""){
        showToast("Email is required")

        return;
    }

    if(loginPasswordField.value === ""){
        showToast("Password is required")

        return;
    }

    try{
        const params = new URLSearchParams()

        params.append("username", loginEmailField.value)
        params.append("password", loginPasswordField.value)
        
        const data = await makeHTTPRequest({
            requestType: "POST",
            requestBody: params,
            requestHeaders: {"Content-Type": "application/x-www-form-urlencoded"},
            requestURL: "auth/login"
        })

        await getCurrentUser();
    }catch (error){
        showToast(`${error.message}`)
    };
};

function toggleShowPassword(event){
    event.preventDefault();

    if(loginPasswordField.type == "text"){
        loginPasswordField.type = "password";
        passwordImage.setAttribute("name", "eye")
    }else{
        loginPasswordField.type = "text";
        passwordImage.setAttribute("name", "eye-off")
    }
}

async function automaticLogin(){
    const success = await getNewRefresh();

    if(success){
        await getCurrentUser();
    }
}

loginBtn.addEventListener("click", loginUser)
showPasswordBtn.addEventListener("click", toggleShowPassword)

automaticLogin()