const actionBtn = document.getElementById("action-btn")
const updateBtn = document.getElementById("update-btn")

const usernameLabel = document.getElementById("username-label")
const emailLabel = document.getElementById("email-label")
const passwordLabel = document.getElementById("password-label")

const updateEmailField = document.getElementById("update-email")
const updateUsernameField = document.getElementById("update-username")
const updatePasswordField = document.getElementById("update-password")

const url = "http://127.0.0.1:8000/api/users"

function loadUserData(){
    const userData = localStorage.getItem("user_data");

    if(!userData){
        alert("No save data found, create an account instead")
        window.location.replace("../index.html");
        return;
    };

    const saveData = JSON.parse(userData);

    emailLabel.textContent = saveData.email;
    usernameLabel.textContent = saveData.username;
}

function logOutUser(){
    alert("Successfully logged out");
    localStorage.clear();
    window.location.replace("../index.html");
}

async function updateUserData(){
    const currentPassword = updatePasswordField.value
    const userData = {
        email: updateEmailField.value,
        username: updateUsernameField.value,
        currentPassword
    };

    if(userData.email == "") delete userData.email
    if(userData.username == "") delete userData.username

    const saveData = JSON.parse(localStorage.getItem("user_data"));
    const token = localStorage.getItem("access_token");
    const id = saveData.id;

    try{
        const response = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        let data = {}

        try{
            data = await response.json();
        } catch(error){
            console.log(error);
        };

        if(!response.ok){
            const errorMessage = Array.isArray(data.detail)
                ? data.detail?.[0]?.msg
                : data.message || data.detail || "Unknown error";

            alert(`An error occurred: (${response.status}) ${errorMessage}`);
            return;
        };

        alert('Success');

        localStorage.setItem("user_data", JSON.stringify(data));
        
        loadUserData()

        updateEmailField.value = ""
        updateUsernameField.value = ""
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
}

actionBtn.addEventListener("click", logOutUser);
updateBtn.addEventListener("click", updateUserData);
loadUserData();