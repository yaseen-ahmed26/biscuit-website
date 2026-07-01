let activeCard = "login";

const signUpBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn")
const registerBtn = document.getElementById("register-btn")

const loginCard = document.getElementById("login-card");
const registerCard = document.getElementById("register-card");

const loginEmailField = document.getElementById("login-email").value
const loginPasswordField = document.getElementById("login-password").value

const registerEmailField = document.getElementById("register-email")
const registerUsernameField = document.getElementById("register-username")
const registerPasswordField = document.getElementById("register-password")

const url = "http://127.0.0.1:8000/api/users"

async function createUser(event){
    event.preventDefault();

    const userData = {
        email: registerEmailField.value,
        username: registerUsernameField.value,
        password: registerPasswordField.value
    };

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })

        const data = await response.json();

        if(!response.ok){
            alert(`An error occurred ${response.status}`, data)
        }

        alert('Success:', data);

    }catch(error){
        alert(`An error occurred: ${error}`)
    }
};

function loginUser(event){
    event.preventDefault();
    console.log("GET request")
};

signUpBtn.addEventListener("click", () => {
    if(activeCard == "login"){
        activeCard = "register"
        loginCard.style.display = "none";
        registerCard.style.display = "block";
    }else{
        activeCard = "login"
        loginCard.style.display = "block";
        registerCard.style.display = "none";
    };

    signUpBtn.textContent = activeCard == "login" ? "Register" : "Login"
});

loginBtn.addEventListener("click", loginUser)
registerBtn.addEventListener("click", createUser)