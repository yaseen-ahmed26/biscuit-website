const actionBtn = document.getElementById("action-btn");
const registerBtn = document.getElementById("register-btn")

const registerEmailField = document.getElementById("register-email")
const registerUsernameField = document.getElementById("register-username")
const registerPasswordField = document.getElementById("register-password")

const url = "http://127.0.0.1:8000/api/users"

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

        let data = {}

        try{
            data = await response.json();
        } catch(error){
            console.log(error)
        }

        if(!response.ok){
            const errorMessage = Array.isArray(data.detail)
                ? data.detail?.[0]?.msg
                : data.message || data.detail || "Unknown error";

            alert(`An error occurred: (${response.status}) ${errorMessage}`);
            return;
        };

        alert('Success:', data);
    }catch (error){
        alert(`An error occurred: ${error.message}`)
    }
};

actionBtn.addEventListener("click", () => {
    window.location.replace("../index.html");
});
registerBtn.addEventListener("click", createUser)