import { getCurrentUser,  makeHTTPRequest} from "./helpers/api.js";

const actionBtn = document.getElementById("action-btn");
const loginBtn = document.getElementById("login-btn")
const showPasswordBtn = document.getElementById("show-password")

const passwordImage = document.getElementById("image")

const loginEmailField = document.getElementById("login-email")
const loginPasswordField = document.getElementById("login-password")

async function loginUser(event){
    event.preventDefault();

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