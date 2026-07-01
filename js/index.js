let activeCard = "login";

const actionBtn = document.getElementById("action-btn");
const loginBtn = document.getElementById("login-btn")
const registerBtn = document.getElementById("register-btn")

const loginCard = document.getElementById("login-card");
const registerCard = document.getElementById("register-card");

const loginEmailField = document.getElementById("login-email")
const loginPasswordField = document.getElementById("login-password")

const registerEmailField = document.getElementById("register-email")
const registerUsernameField = document.getElementById("register-username")
const registerPasswordField = document.getElementById("register-password")

const url = "http://127.0.0.1:8000/api/users"

async function getCurrentUser(token) {
    try{
        const response = await fetch(url + "/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(!response.ok){
            alert("Failed to fetch user data");
            return;
        }

        const userData = await response.json();

        localStorage.setItem("user_data", JSON.stringify(userData));

        window.location.replace("pages/account.html");
    
    }catch (error){
        alert(`An error occurred: ${error.message}`);
    };
};

async function createUser(event){
    event.preventDefault();

    if(
        registerEmailField.value == "" ||
        registerUsernameField.value == "" ||
        registerPasswordField.value == ""
    ){
        alert("Missing fields")
        return;
    }

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
            alert(`An error occurred ${response.status} ${data.detail}`)
            return;
        }

        alert('Success:', data);
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
};

async function loginUser(event){
    event.preventDefault();
    
    const formData = new URLSearchParams();

    formData.append("username", loginEmailField.value);
    formData.append("password", loginPasswordField.value);

    try{
        const response = await fetch(url + "/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        });

        const data = await response.json();

        if (!response.ok){
            alert(`An error occurred ${response.status} ${data.detail}`)
            return;
        }

        localStorage.setItem("access_token", data.access_token);
        alert("Login successful");

        await getCurrentUser(data.access_token);
    }catch (error) {
        alert(`An error occurred: ${error.message}`);
    };
};

actionBtn.addEventListener("click", () => {
    if(activeCard == "login"){
        activeCard = "register"
        loginCard.style.display = "none";
        registerCard.style.display = "block";
    }else{
        activeCard = "login"
        loginCard.style.display = "block";
        registerCard.style.display = "none";
    };

    actionBtn.textContent = activeCard == "login" ? "Register" : "Login"
});

loginBtn.addEventListener("click", loginUser)
registerBtn.addEventListener("click", createUser)