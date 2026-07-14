import { loginEndpoint, getCurrentUser } from "./helpers/api.js";

const actionBtn = document.getElementById("action-btn");
const loginBtn = document.getElementById("login-btn")
const showPasswordBtn = document.getElementById("show-password")

const passwordImage = document.getElementById("image")

const loginEmailField = document.getElementById("login-email")
const loginPasswordField = document.getElementById("login-password")

const url = "http://127.0.0.1:8000/api/users"

async function loginUser(event){
    event.preventDefault();

    try{
        const data = await loginEndpoint(loginEmailField.value, loginPasswordField.value)

        localStorage.setItem("access_token", data.access_token);
        alert("Login successful");

        await getCurrentUser();
    }catch (error) {
        alert(`${error.message}`);
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

actionBtn.addEventListener("click", () => {
    window.location.replace("pages/register.html");
});
loginBtn.addEventListener("click", loginUser)
showPasswordBtn.addEventListener("click", toggleShowPassword)